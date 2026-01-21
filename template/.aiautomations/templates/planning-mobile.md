# Mobile App Planning Template

## 1. Project Overview

### App Name
[Name]

### Description
[1-2 sentence description]

### Platform
- [ ] iOS only
- [ ] Android only
- [ ] Cross-platform (React Native / Flutter / etc.)

### Target Users
[Primary audience]

### Core Problem
[What problem does this solve?]

---

## 2. Technical Decisions

### Framework Choice

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| React Native | JS ecosystem, hot reload | Performance limits | |
| Flutter | Performance, single codebase | Dart learning curve | |
| Native (Swift/Kotlin) | Best performance | Two codebases | |
| Expo | Easy setup, OTA updates | Limited native access | |

**Selected**: [Framework]
**Reason**: [Why]

### Minimum OS Versions
- iOS: [version]
- Android: [version]

### State Management
- [ ] Redux / Redux Toolkit
- [ ] MobX
- [ ] Context API
- [ ] Riverpod (Flutter)
- [ ] Provider (Flutter)
- [ ] Zustand

### Navigation
- [ ] React Navigation
- [ ] Expo Router
- [ ] GoRouter (Flutter)

### Backend Integration
- [ ] REST API
- [ ] GraphQL
- [ ] Firebase
- [ ] Supabase
- [ ] Custom backend

---

## 3. Features & Screens

### Core Features (MVP)
| Feature | Priority | Complexity | Screen(s) |
|---------|----------|------------|-----------|
| | P0 | | |
| | P0 | | |
| | P1 | | |

### Screen Map
```
App
├── Auth Flow
│   ├── Splash
│   ├── Onboarding
│   ├── Login
│   └── Register
├── Main Flow (Tab Navigation)
│   ├── Home
│   ├── [Feature 1]
│   ├── [Feature 2]
│   └── Profile
└── Modals/Overlays
    ├── Settings
    └── [Others]
```

### User Flows
```
1. First Launch:
   Splash → Onboarding → Register → Home

2. Returning User:
   Splash → Login → Home

3. Core Feature:
   Home → [Feature] → [Action] → Confirmation
```

---

## 4. Data & Storage

### Local Storage
| Data | Storage Type | Sync Strategy |
|------|--------------|---------------|
| User preferences | AsyncStorage / SharedPrefs | On change |
| Auth tokens | Secure storage | On auth |
| Cache | SQLite / Realm | Background |
| Offline data | SQLite | When online |

### API Endpoints Needed
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | User login |
| `/auth/register` | POST | User registration |
| `/users/me` | GET | Get current user |
| | | |

### Offline Support
- [ ] Required
- [ ] Nice to have
- [ ] Not needed

If required:
- Offline-first architecture
- Sync strategy: [describe]
- Conflict resolution: [describe]

---

## 5. UI/UX Design

### Design System
- [ ] Custom design
- [ ] Material Design
- [ ] iOS Human Interface Guidelines
- [ ] Existing design system: [name]

### Component Library
- [ ] Custom components
- [ ] React Native Paper
- [ ] NativeBase
- [ ] UI Kitten
- [ ] Flutter Material

### Key UI Considerations
- [ ] Dark mode support
- [ ] Accessibility (a11y)
- [ ] RTL support
- [ ] Responsive (tablet support)
- [ ] Landscape orientation

### Typography
- Primary font: [font]
- Sizes: [scale]

### Colors
- Primary: [color]
- Secondary: [color]
- Background: [color]
- Text: [color]

---

## 6. Native Features

### Required Permissions
| Permission | Purpose | Platform |
|------------|---------|----------|
| Camera | Profile photo | Both |
| Location | [purpose] | Both |
| Push Notifications | Alerts | Both |
| | | |

### Native Modules/Plugins
| Feature | Package/Plugin |
|---------|----------------|
| Camera | react-native-camera / image_picker |
| Maps | react-native-maps / google_maps_flutter |
| Push | Firebase Cloud Messaging |
| Analytics | Firebase Analytics |
| | |

### Platform-Specific Features
**iOS Only:**
- [ ] Apple Sign In
- [ ] HealthKit
- [ ] Siri Shortcuts

**Android Only:**
- [ ] Widgets
- [ ] Picture-in-Picture
- [ ] Split screen

---

## 7. Security

### Authentication
- [ ] Email/Password
- [ ] Social login (Google, Apple, Facebook)
- [ ] Biometric (Face ID, Fingerprint)
- [ ] OTP/2FA

### Data Security
- [ ] SSL pinning
- [ ] Secure token storage
- [ ] Data encryption at rest
- [ ] Jailbreak/root detection
- [ ] Screenshot prevention (sensitive screens)

### API Security
- [ ] API key management
- [ ] Token refresh mechanism
- [ ] Request signing

---

## 8. Performance

### Targets
| Metric | Target |
|--------|--------|
| App launch (cold) | < 2s |
| Screen transition | < 300ms |
| API response display | < 1s |
| App size | < 50MB |
| Memory usage | < 200MB |

### Optimization Strategies
- [ ] Image optimization
- [ ] Lazy loading
- [ ] List virtualization
- [ ] Bundle optimization
- [ ] Hermes engine (RN)

---

## 9. Testing Strategy

### Test Types
| Type | Tool | Coverage |
|------|------|----------|
| Unit | Jest / flutter_test | Core logic |
| Component | React Native Testing Library | UI |
| Integration | Detox / integration_test | Flows |
| E2E | Appium / Maestro | Critical paths |

### Device Testing
- [ ] Physical devices
- [ ] Simulators/Emulators
- [ ] Cloud testing (BrowserStack, etc.)

### Test Devices
| Platform | Devices |
|----------|---------|
| iOS | iPhone 12, 14, SE |
| Android | Pixel 5, Samsung S21 |

---

## 10. Deployment

### App Stores
- [ ] Apple App Store
- [ ] Google Play Store
- [ ] Alternative stores (Huawei, etc.)

### CI/CD Pipeline
```
Code Push → Lint/Test → Build →
Internal Testing → Beta → Production
```

### Tools
- [ ] Fastlane
- [ ] App Center
- [ ] Bitrise
- [ ] Codemagic
- [ ] GitHub Actions

### Release Strategy
- [ ] Staged rollout
- [ ] Beta testing (TestFlight / Internal Track)
- [ ] OTA updates (Expo / CodePush)

---

## 11. Analytics & Monitoring

### Analytics
- [ ] Firebase Analytics
- [ ] Mixpanel
- [ ] Amplitude
- [ ] Custom analytics

### Crash Reporting
- [ ] Firebase Crashlytics
- [ ] Sentry
- [ ] Bugsnag

### Key Events to Track
| Event | Parameters |
|-------|------------|
| app_open | |
| sign_up | method |
| login | method |
| | |

---

## 12. Folder Structure

```
src/
├── components/
│   ├── common/
│   └── screens/
├── navigation/
├── screens/
├── services/
│   ├── api/
│   └── storage/
├── store/
├── hooks/
├── utils/
├── constants/
├── types/
└── assets/
    ├── images/
    └── fonts/
```

---

## 13. Development Phases

### Phase 1: Foundation
- [ ] Project setup
- [ ] Navigation structure
- [ ] Design system components
- [ ] Auth flow
- [ ] API integration base

### Phase 2: Core Features
- [ ] [Feature 1]
- [ ] [Feature 2]
- [ ] [Feature 3]

### Phase 3: Polish
- [ ] Error handling
- [ ] Loading states
- [ ] Offline support
- [ ] Performance optimization
- [ ] Accessibility

### Phase 4: Launch Prep
- [ ] App store assets
- [ ] Beta testing
- [ ] Bug fixes
- [ ] Store submission

---

## 14. Checklist Before Development

- [ ] Wireframes/designs ready
- [ ] API contracts defined
- [ ] Third-party accounts created
- [ ] Development environment set up
- [ ] CI/CD pipeline configured
- [ ] App store accounts ready
