import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'like',
    user: 'dorji_wangmo',
    avatar: 'https://i.pravatar.cc/150?img=1',
    text: 'liked your video',
    time: '2h ago',
  },
  {
    id: '2',
    type: 'follow',
    user: 'pema_tshering',
    avatar: 'https://i.pravatar.cc/150?img=2',
    text: 'started following you',
    time: '3h ago',
  },
  {
    id: '3',
    type: 'comment',
    user: 'karma_dancer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    text: 'commented: "This is amazing! 🔥"',
    time: '5h ago',
  },
  {
    id: '4',
    type: 'like',
    user: 'thinley_adventures',
    avatar: 'https://i.pravatar.cc/150?img=4',
    text: 'and 42 others liked your video',
    time: '8h ago',
  },
  {
    id: '5',
    type: 'mention',
    user: 'sonam_arts',
    avatar: 'https://i.pravatar.cc/150?img=5',
    text: 'mentioned you in a comment',
    time: '1d ago',
  },
];

function getIcon(type) {
  switch (type) {
    case 'like': return { name: 'heart', color: COLORS.like };
    case 'follow': return { name: 'person-add', color: COLORS.secondary };
    case 'comment': return { name: 'chatbubble', color: COLORS.accent };
    case 'mention': return { name: 'at', color: COLORS.success };
    default: return { name: 'notifications', color: COLORS.white };
  }
}

export default function InboxScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <TouchableOpacity>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.tabActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>All Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Mentions</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const icon = getIcon(item.type);
          return (
            <TouchableOpacity style={styles.notifItem} activeOpacity={0.7}>
              <Image source={{ uri: item.avatar }} style={styles.notifAvatar} />
              <View style={styles.notifContent}>
                <Text style={styles.notifText}>
                  <Text style={styles.notifUsername}>{item.user}</Text> {item.text}
                </Text>
                <Text style={styles.notifTime}>{item.time}</Text>
              </View>
              <Ionicons name={icon.name} size={18} color={icon.color} />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.mediumGray,
  },
  tabActive: {
    backgroundColor: COLORS.white,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.dark,
  },
  list: {
    paddingHorizontal: 16,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.mediumGray,
    gap: 12,
  },
  notifAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  notifContent: {
    flex: 1,
  },
  notifText: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 20,
  },
  notifUsername: {
    fontWeight: '700',
  },
  notifTime: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
});
