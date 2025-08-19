# TopNav Component - Test Plan

## Desktop Testing

### Navigation Tabs
- [ ] Dashboard tab shows active on `/dashboard`
- [ ] Packages tab shows active on `/packages/*` routes  
- [ ] Clicking tabs navigates to correct URLs
- [ ] Active tabs show underline indicator
- [ ] Hover states work correctly

### Action Buttons
- [ ] "Add Package" button navigates to `/packages/create`
- [ ] Refresh button calls `router.reload({ only: ['packages'] })`
- [ ] Help menu dropdown opens/closes properly
- [ ] User avatar menu opens/closes properly

### Logo
- [ ] Clicking logo navigates to `/dashboard`
- [ ] Logo displays correctly

## Mobile Testing (< 768px)

### Collapsed Navigation
- [ ] Hamburger menu icon appears
- [ ] Sheet menu opens when hamburger is clicked
- [ ] All navigation items appear in sheet menu
- [ ] Active states show correctly in sheet menu
- [ ] Sheet menu closes when item is clicked

### Action Buttons
- [ ] "Add Package" collapses to plus icon only
- [ ] All other action buttons remain visible
- [ ] Mobile sheet includes Add Package and Refresh actions

## Keyboard Navigation

### Tab Navigation
- [ ] Tab key moves through all interactive elements in logical order
- [ ] Focus rings are visible on all focused elements
- [ ] Enter/Space activates focused buttons and links
- [ ] Escape closes open dropdowns/sheets

### Accessibility
- [ ] Screen reader announces navigation elements correctly
- [ ] `aria-current="page"` set on active tabs
- [ ] All buttons have proper `aria-label` attributes
- [ ] Mobile menu has proper `aria-labelledby` and roles

## Route Highlighting

### Dashboard Route (`/dashboard`)
- [ ] Dashboard tab active, Packages tab inactive

### Package Routes
- [ ] `/packages/create`: Packages tab active
- [ ] `/packages/123`: Packages tab active  
- [ ] `/packages/123/edit`: Packages tab active

## Breadcrumbs

### Breadcrumb Display
- [ ] Breadcrumbs appear below TopNav when `breadcrumbs.length > 1`
- [ ] Breadcrumbs have proper horizontal padding and max-width
- [ ] Breadcrumbs maintain styling consistency

### Content Layout
- [ ] Content has proper padding and max-width container
- [ ] No horizontal scrolling issues
- [ ] Proper spacing between TopNav and content

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox  
- [ ] Safari (if available)

## Responsive Breakpoints

- [ ] `sm` (640px+): Mobile add button shows as icon only
- [ ] `md` (768px+): Full navigation tabs visible, sheet menu hidden
- [ ] `max-w-7xl` container works at all sizes