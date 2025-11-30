const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export async function sendMessage(message, conversationId = null, history = [], model = 'gpt-4o-mini') {
  const res = await fetch(`${API_URL}/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ 
      message, 
      conversation_id: conversationId,
      history,
      model  // Send model to backend
    }),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to send message');
  }
  
  return res.json();
}

export async function resetConversation() {
  const res = await fetch(`${API_URL}/chat/reset/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to reset conversation');
  }
  
  return res.json();
}

export async function getConversations() {
  const token = localStorage.getItem('access_token');
  if (!token) return [];
  
  const res = await fetch(`${API_URL}/conversations/`, {
    headers: getAuthHeaders(),
  });
  
  if (!res.ok) {
    if (res.status === 401) return [];
    throw new Error('Failed to fetch conversations');
  }
  
  return res.json();
}

export async function getConversation(id) {
  const res = await fetch(`${API_URL}/conversations/${id}/`, {
    headers: getAuthHeaders(),
  });
  
  if (!res.ok) throw new Error('Failed to fetch conversation');
  
  return res.json();
}

export async function deleteConversation(id) {
  const res = await fetch(`${API_URL}/conversations/${id}/delete/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete conversation');
  return res.json();
}