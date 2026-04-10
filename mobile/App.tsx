import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const API_URL = 'http://localhost:3000/api';

const api = axios.create({ baseURL: API_URL });

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email || !password || !domain) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password, domain });
      localStorage.setItem('token', data.token);
      localStorage.setItem('tenantId', data.tenant.id);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigation.replace('Dashboard');
    } catch (e) {
      Alert.alert('Erro', 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ERP SaaS</Text>
      <TextInput style={styles.input} placeholder="Domínio" value={domain} onChangeText={setDomain} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={login} disabled={loading} />
    </View>
  );
}

function DashboardScreen({ navigation }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const tenantId = localStorage.getItem('tenantId');
      const { data } = await api.get('/admin/orders/stats', { params: { tenantId } });
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.statValue}>{stats?.total || 0}</Text>
          <Text>Total</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
          <Text style={[styles.statValue, { color: '#D97706' }]}>{stats?.pending || 0}</Text>
          <Text style={{ color: '#D97706' }}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.statCard, { backgroundColor: '#DBEAFE' }]}>
          <Text style={[styles.statValue, { color: '#2563EB' }]}>{stats?.confirmed || 0}</Text>
          <Text style={{ color: '#2563EB' }}>Confirmados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
          <Text style={[styles.statValue, { color: '#059669' }]}>{stats?.revenue || 0}</Text>
          <Text style={{ color: '#059669' }}>Receita</Text>
        </TouchableOpacity>
      </View>
      <Button title="Ver Pedidos" onPress={() => navigation.navigate('Orders')} />
    </View>
  );
}

function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const tenantId = localStorage.getItem('tenantId');
      const { data } = await api.get('/admin/orders', { params: { tenantId } });
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const statusColors: Record<string, string> = {
    PENDING: '#F59E0B',
    CONFIRMED: '#3B82F6',
    PROCESSING: '#8B5CF6',
    DELIVERED: '#10B981',
    CANCELLED: '#EF4444',
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}>
            <View style={styles.orderRow}>
              <Text style={styles.orderNumber}>{item.orderNumber}</Text>
              <Text style={[styles.orderStatus, { backgroundColor: statusColors[item.status] + '#20', color: statusColors[item.status] }]}>
                {item.status}
              </Text>
            </View>
            <Text>{item.customerName}</Text>
            <Text style={styles.orderTotal}>R$ {item.total}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function OrderDetailScreen({ route }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = route.params || {};

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    try {
      const tenantId = localStorage.getItem('tenantId');
      const { data } = await api.get(`/admin/orders/${orderId}`, { params: { tenantId } });
      setOrder(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status: string) {
    try {
      const tenantId = localStorage.getItem('tenantId');
      await api.put(`/admin/orders/${orderId}/status`, { status }, { params: { tenantId } });
      Alert.alert('Sucesso', 'Status atualizado');
      loadOrder();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível atualizar');
    }
  }

  if (loading) return <ActivityIndicator size="large" />;
  if (!order) return <Text>Pedido não encontrado</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{order.orderNumber}</Text>
      <Text>Cliente: {order.customerName}</Text>
      <Text>WhatsApp: {order.customerPhone}</Text>
      <Text>Total: R$ {order.total}</Text>
      <Text style={styles.subtitle}>Itens:</Text>
      {order.items?.map((item: any) => (
        <View key={item.id} style={styles.itemRow}>
          <Text>{item.productName}</Text>
          <Text>{item.quantity}x</Text>
          <Text>R$ {item.total}</Text>
        </View>
      ))}
      <Text style={styles.subtitle}>Alterar Status:</Text>
      <View style={styles.statusButtons}>
        {['PENDING', 'CONFIRMED', 'PROCESSING', 'DELIVERED', 'CANCELLED'].map((status) => (
          <Button key={status} title={status} onPress={() => updateStatus(status)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, marginBottom: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  statCard: { width: '48%', backgroundColor: '#FFF', padding: 16, borderRadius: 8, marginBottom: 8, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  orderCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, marginBottom: 8 },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderNumber: { fontWeight: 'bold' },
  orderStatus: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, overflow: 'hidden' },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#10B981' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  statusButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});