import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function formatCount(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export default function VideoCard({ video, isActive }) {
  const videoRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);

  const togglePlay = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const toggleLike = useCallback(() => {
    setIsLiked(prev => {
      setLikeCount(c => prev ? c - 1 : c + 1);
      return !prev;
    });
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.videoWrapper} onPress={togglePlay}>
        <Video
          ref={videoRef}
          source={{ uri: video.uri }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay={isActive && !isPaused}
          isLooping
          isMuted={false}
        />
        {isPaused && (
          <View style={styles.pauseOverlay}>
            <Ionicons name="play" size={60} color="rgba(255,255,255,0.7)" />
          </View>
        )}
      </Pressable>

      {/* Right side action buttons */}
      <View style={styles.actions}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: video.user.avatar }} style={styles.avatar} />
          <View style={styles.followBadge}>
            <Ionicons name="add" size={14} color={COLORS.white} />
          </View>
        </View>

        <ActionButton
          icon={<Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={32} color={isLiked ? COLORS.like : COLORS.white} />}
          label={formatCount(likeCount)}
          onPress={toggleLike}
        />
        <ActionButton
          icon={<FontAwesome name="commenting-o" size={30} color={COLORS.white} />}
          label={formatCount(video.comments)}
        />
        <ActionButton
          icon={<Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={30} color={isBookmarked ? COLORS.accent : COLORS.white} />}
          label={formatCount(video.bookmarks)}
          onPress={() => setIsBookmarked(prev => !prev)}
        />
        <ActionButton
          icon={<MaterialCommunityIcons name="share" size={30} color={COLORS.white} />}
          label={formatCount(video.shares)}
        />

        <TouchableOpacity style={styles.musicDisc}>
          <Image source={{ uri: video.user.avatar }} style={styles.musicDiscImage} />
        </TouchableOpacity>
      </View>

      {/* Bottom info */}
      <View style={styles.bottomInfo}>
        <View style={styles.userRow}>
          <Text style={styles.username}>@{video.user.username}</Text>
          {video.user.verified && (
            <Ionicons name="checkmark-circle" size={16} color="#20D5EC" style={{ marginLeft: 4 }} />
          )}
        </View>
        <Text style={styles.description} numberOfLines={2}>{video.description}</Text>
        <View style={styles.songRow}>
          <Ionicons name="musical-notes" size={14} color={COLORS.white} />
          <Text style={styles.songText} numberOfLines={1}>{video.song}</Text>
        </View>
      </View>
    </View>
  );
}

function ActionButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress} activeOpacity={0.7}>
      {icon}
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: COLORS.dark,
  },
  videoWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  actions: {
    position: 'absolute',
    right: 8,
    bottom: 100,
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  followBadge: {
    position: 'absolute',
    bottom: -6,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    gap: 2,
  },
  actionLabel: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  musicDisc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: COLORS.darkGray,
    overflow: 'hidden',
    marginTop: 4,
  },
  musicDiscImage: {
    width: '100%',
    height: '100%',
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 90,
    left: 12,
    right: 80,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  username: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  songText: {
    color: COLORS.white,
    fontSize: 13,
    flex: 1,
  },
});
