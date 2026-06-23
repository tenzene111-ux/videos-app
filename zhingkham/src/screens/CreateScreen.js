import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CreateScreen() {
  const [mode, setMode] = useState('video');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity>
          <Ionicons name="close" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create</Text>
        <TouchableOpacity>
          <Ionicons name="musical-notes" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraPlaceholder}>
        <View style={styles.cameraCircle}>
          <Ionicons name="camera" size={60} color={COLORS.textSecondary} />
          <Text style={styles.cameraText}>Camera Preview</Text>
          <Text style={styles.cameraSubtext}>Tap the record button to start</Text>
        </View>
      </View>

      <View style={[styles.controls, { paddingBottom: insets.bottom + 80 }]}>
        <View style={styles.sideControls}>
          <ControlButton icon="flash-off" label="Flash" />
          <ControlButton icon="timer-outline" label="Timer" />
          <ControlButton icon="color-filter" label="Filters" />
          <ControlButton icon="sparkles" label="Effects" />
        </View>

        <View style={styles.recordSection}>
          <View style={styles.modeSelector}>
            {['15s', '60s', '3m'].map((duration) => (
              <TouchableOpacity key={duration}>
                <Text style={[styles.modeText, duration === '60s' && styles.modeTextActive]}>
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.recordButton} activeOpacity={0.7}>
            <View style={styles.recordButtonInner} />
          </TouchableOpacity>

          <View style={styles.bottomModes}>
            {['Photo', 'Video', 'Live'].map((m) => (
              <TouchableOpacity key={m} onPress={() => setMode(m.toLowerCase())}>
                <Text style={[styles.bottomModeText, mode === m.toLowerCase() && styles.bottomModeActive]}>
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sideControlsRight}>
          <TouchableOpacity style={styles.flipButton}>
            <Ionicons name="camera-reverse" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton}>
            <Ionicons name="images" size={24} color={COLORS.white} />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ControlButton({ icon, label }) {
  return (
    <TouchableOpacity style={styles.controlButton}>
      <Ionicons name={icon} size={24} color={COLORS.white} />
      <Text style={styles.controlLabel}>{label}</Text>
    </TouchableOpacity>
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
    paddingBottom: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkGray,
  },
  cameraCircle: {
    alignItems: 'center',
    gap: 12,
  },
  cameraText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '600',
  },
  cameraSubtext: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  sideControls: {
    gap: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  sideControlsRight: {
    gap: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    alignItems: 'center',
    gap: 4,
  },
  controlLabel: {
    color: COLORS.white,
    fontSize: 10,
  },
  recordSection: {
    alignItems: 'center',
    gap: 16,
  },
  modeSelector: {
    flexDirection: 'row',
    gap: 16,
  },
  modeText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: '600',
  },
  modeTextActive: {
    color: COLORS.white,
  },
  recordButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  bottomModes: {
    flexDirection: 'row',
    gap: 20,
  },
  bottomModeText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomModeActive: {
    color: COLORS.white,
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    alignItems: 'center',
    gap: 4,
  },
  uploadText: {
    color: COLORS.white,
    fontSize: 10,
  },
});
