import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { CURRENT_USER, SAMPLE_VIDEOS } from '../constants/dummyData';

const { width } = Dimensions.get('window');
const GRID_SIZE = width / 3;

function formatCount(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('videos');
  const insets = useSafeAreaInsets();
  const user = CURRENT_USER;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="person-add-outline" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.username}>@{user.username}</Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.displayName}>{user.displayName}</Text>

          <View style={styles.stats}>
            <StatItem count={formatCount(user.following)} label="Following" />
            <View style={styles.statDivider} />
            <StatItem count={formatCount(user.followers)} label="Followers" />
            <View style={styles.statDivider} />
            <StatItem count={formatCount(user.likes)} label="Likes" />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="bookmark-outline" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'videos' && styles.tabActive]}
            onPress={() => setActiveTab('videos')}
          >
            <Ionicons name="grid" size={20} color={activeTab === 'videos' ? COLORS.white : COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'liked' && styles.tabActive]}
            onPress={() => setActiveTab('liked')}
          >
            <Ionicons name="heart" size={20} color={activeTab === 'liked' ? COLORS.white : COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {SAMPLE_VIDEOS.map((video) => (
            <TouchableOpacity key={video.id} style={styles.gridTile} activeOpacity={0.8}>
              <Image source={{ uri: video.user.avatar }} style={styles.gridImage} />
              <View style={styles.gridOverlay}>
                <Ionicons name="play" size={12} color={COLORS.white} />
                <Text style={styles.gridViews}>{formatCount(video.likes)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function StatItem({ count, label }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
  username: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 12,
  },
  displayName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.lightGray,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: COLORS.mediumGray,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 6,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  iconButton: {
    backgroundColor: COLORS.mediumGray,
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bio: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.mediumGray,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.white,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridTile: {
    width: GRID_SIZE,
    height: GRID_SIZE * 1.3,
    backgroundColor: COLORS.mediumGray,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gridViews: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
