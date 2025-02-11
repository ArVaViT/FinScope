// src/services/notifications.js
const baseUrl = import.meta.env.VITE_API_URL;

export async function getNotifications(token) {
  const response = await fetch(`${baseUrl}/notifications`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }
  return response.json();
}

export async function deleteNotification(token, id) {
  const response = await fetch(`${baseUrl}/notifications/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to delete notification');
  }
  return response.json();
}
