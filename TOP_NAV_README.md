# TopNav Component - Adding New Tabs

## Overview

The `TopNav` component (`resources/js/components/top-nav.tsx`) provides a responsive top navigation bar with tabs, actions, and user menu. This guide explains how to add new tabs to the navigation.

## Adding a New Tab

### 1. Update the mainTabs Array

In `resources/js/components/top-nav.tsx`, locate the `mainTabs` array and add your new tab:

```typescript
const mainTabs: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Packages', 
        href: '/packages',
        icon: Folder,
    },
    {
        title: 'Analytics', // New tab
        href: '/analytics',
        icon: BarChart3, // Import from lucide-react
    },
];
```

### 2. Import Required Icons

Add any new icons to the import statement at the top of the file:

```typescript
import { BookOpen, Folder, HelpCircle, LayoutGrid, Menu, Plus, RefreshCw, BarChart3 } from 'lucide-react';
```

### 3. Update Active Tab Logic (if needed)

The `isActiveTab` function automatically handles most cases by checking if the current URL starts with the tab's href. For special cases, modify the function:

```typescript
const isActiveTab = (href: string) => {
    if (href === '/dashboard') {
        return page.url === '/dashboard';
    }
    if (href === '/analytics') {
        return page.url.startsWith('/analytics') || page.url.startsWith('/reports');
    }
    return page.url.startsWith(href);
};
```

### 4. Create the Corresponding Page

Create your page component in the appropriate directory (e.g., `resources/js/pages/analytics.tsx`) and ensure the route exists in your Laravel routes.

### 5. Mobile Navigation

The mobile navigation automatically includes all tabs from the `mainTabs` array, so no additional changes are needed.

## Tab Behavior

- **Active State**: Tabs show as active based on the current URL
- **Visual Indicator**: Active tabs have a different background and an underline indicator on desktop
- **Keyboard Navigation**: All tabs support keyboard navigation with proper focus rings
- **Mobile Responsive**: Tabs collapse into a mobile menu on small screens

## Accessibility Features

- All tabs have proper `aria-current="page"` when active
- Keyboard navigation support with focus rings
- Screen reader friendly labels
- Mobile menu has proper ARIA labels and roles

## Testing Your Changes

### Manual Testing Checklist

1. **Desktop Navigation**:
   - [ ] New tab appears in the navigation bar
   - [ ] Tab shows active state when on the correct page
   - [ ] Tab has proper hover effects
   - [ ] Clicking tab navigates to correct URL

2. **Mobile Navigation**:
   - [ ] New tab appears in the mobile sheet menu
   - [ ] Tab shows active state in mobile menu
   - [ ] Mobile menu opens/closes properly

3. **Keyboard Navigation**:
   - [ ] Tab can be reached with Tab key
   - [ ] Tab can be activated with Enter/Space
   - [ ] Focus ring is visible
   - [ ] Focus moves logically between elements

4. **Accessibility**:
   - [ ] Screen reader announces tab correctly
   - [ ] Active state is announced properly
   - [ ] Mobile menu has proper labels

### Browser Testing

Test your changes across different browsers and screen sizes to ensure consistent behavior.