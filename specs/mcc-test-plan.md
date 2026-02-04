# Managed Care Contracting Database Test Plan

## Application Overview

The AMA Managed Care Contracting (MCC) Legal Database is a comprehensive resource identifying how state and federal statutes, regulations, and AMA policies address managed care contracting issues. The site provides access to 1,315+ state laws, 49 federal laws, and 260+ AMA policies across multiple issue categories including payment issues, network issues, contract changes/disputes, coverage/utilization review, and claims processing. Users can search, filter by issue category and state, and access detailed information about healthcare law and policy.

## Test Scenarios

### 1. Homepage and Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage loads with all main sections visible

**File:** `tests/homepage/homepage-load.spec.ts`

**Steps:**
  1. Navigate to https://mcc-test-cf.test-ama-assn.org/
  2. Verify page title displays 'Home | Managed Care Contracting'
  3. Verify the main heading 'An American Medical Association Managed Care Resource' is visible
  4. Verify descriptive text about the database is present
  5. Verify the 'How to Use' link is clickable

**Expected Results:**
  - Page loads successfully with correct title
  - Main heading and description text are clearly visible
  - 'How to Use' link is accessible and clickable
  - All navigation elements are present in the header

#### 1.2. Homepage displays three main content cards

**File:** `tests/homepage/homepage-cards.spec.ts`

**Steps:**
  1. Navigate to the homepage
  2. Verify 'State Laws' card is visible with description and 'Explore' link
  3. Verify 'Federal Laws' card is visible with description and 'Explore' link
  4. Verify 'AMA Policies' card is visible with description and 'Explore' link
  5. Click each 'Explore' link and verify navigation

**Expected Results:**
  - All three content cards are displayed with correct titles
  - Each card includes relevant description text
  - All 'Explore' links are functional and navigate to correct sections
  - Links properly construct filter URLs

#### 1.3. Homepage displays Payment Issues table with tabs

**File:** `tests/homepage/homepage-issues-table.spec.ts`

**Steps:**
  1. Navigate to the homepage
  2. Verify Payment Issues, Network Issues, Contract Changes/Disputes, Coverage/Utilization Review, and Claims Processing tabs are visible
  3. Verify the Payment Issues tab is selected by default
  4. Click on each tab and verify content changes
  5. Verify all issue category links in the Payment Issues table are clickable

**Expected Results:**
  - All five issue category tabs are displayed
  - Payment Issues tab is pre-selected
  - Clicking tabs changes the table content appropriately
  - All table cell links are functional and navigate correctly

#### 1.4. Main navigation menu is accessible and functional

**File:** `tests/navigation/main-nav.spec.ts`

**Steps:**
  1. Navigate to the homepage
  2. Verify main navigation contains: State Laws, Federal Law, AMA Policies, Feedback links
  3. Click 'State Laws' link and verify navigation to /state-laws-map
  4. Click 'Federal Law' link and verify navigation to /federal-law
  5. Click 'AMA Policies' link and verify navigation to /ama-policy
  6. Click 'Feedback' link and verify navigation to /feedback

**Expected Results:**
  - All four main navigation links are present
  - Each link navigates to the correct page
  - URLs match expected patterns
  - Page content updates appropriately after navigation

#### 1.5. Home logo and branding elements are present

**File:** `tests/navigation/branding.spec.ts`

**Steps:**
  1. Navigate to any page on the site
  2. Verify the Home logo is visible in the header
  3. Click the Home logo and verify it navigates to the homepage
  4. Verify the AMA logo is visible in the footer
  5. Verify the footer copyright text is present

**Expected Results:**
  - Home logo is visible and clickable from all pages
  - Home logo navigates to the homepage
  - AMA branding elements are present throughout the site
  - Footer contains appropriate copyright information

### 2. State Laws Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. State Laws page loads with interactive map

**File:** `tests/state-laws/state-laws-page.spec.ts`

**Steps:**
  1. Navigate to /state-laws-map
  2. Verify page title displays 'State Laws Map | Managed Care Contracting'
  3. Verify the interactive US map is visible
  4. Verify all 50 states plus territories are clickable on the map
  5. Verify state abbreviations are displayed on map

**Expected Results:**
  - Page loads successfully with correct title
  - Interactive map is displayed and responsive
  - All state buttons are present on the map
  - State names appear on hover or click

#### 2.2. State Laws filtering by Payment Issues works correctly

**File:** `tests/state-laws/state-laws-filter-payment.spec.ts`

**Steps:**
  1. Navigate to State Laws page
  2. Verify 'Filter by' section is visible on the left sidebar
  3. Verify Payment Issues section shows: Fee Schedules (58), Overpayments/Recoupments (58), Risk—Physicians Taking (56), etc.
  4. Click 'Fee Schedules' checkbox
  5. Verify URL updates with filter parameter: ?payment_issues%5BFee%20Schedules%5D=Fee%20Schedules
  6. Verify results count changes to 58
  7. Verify results only show laws related to Fee Schedules

**Expected Results:**
  - Checkbox selection updates the URL with filter parameters
  - Results list filters correctly to show only 58 matching items
  - Each result displays 'Fee Schedules' in its issue tags
  - Filter can be cleared by unchecking or using Clear link

#### 2.3. State Laws filtering by Network Issues works correctly

**File:** `tests/state-laws/state-laws-filter-network.spec.ts`

**Steps:**
  1. Navigate to State Laws page
  2. Click 'OON-Payment Issues' checkbox under Network Issues
  3. Verify results filter to show 151 matching items
  4. Click 'Network Adequacy' checkbox
  5. Verify results refine and count updates
  6. Verify all displayed results show selected issue categories

**Expected Results:**
  - Network Issues filters function correctly
  - Multiple filters can be applied simultaneously
  - Result count updates as filters are applied
  - All results display matching issue tags

#### 2.4. State Laws filtering by State dropdown works correctly

**File:** `tests/state-laws/state-laws-filter-state.spec.ts`

**Steps:**
  1. Navigate to State Laws page
  2. Verify State dropdown shows '- Any -' as default
  3. Open State dropdown and verify all states are listed with result counts
  4. Select 'Texas (111)' from dropdown
  5. Verify URL updates with state parameter
  6. Verify results filter to show only Texas laws
  7. Select 'California (63)' and verify Texas results disappear

**Expected Results:**
  - State dropdown displays all 50 states plus territories
  - Selecting a state filters results appropriately
  - State counts in dropdown match actual filtered results
  - Dropdown selection updates URL parameters

#### 2.5. State Laws results pagination works correctly

**File:** `tests/state-laws/state-laws-pagination.spec.ts`

**Steps:**
  1. Navigate to State Laws page
  2. Verify 'Displaying 1 - 15 of 1315 results' text is shown
  3. Verify pagination shows 'Page 1 of 88'
  4. Click 'Next page' link
  5. Verify URL contains ?page=1 parameter
  6. Verify new results (items 16-30) are displayed
  7. Click Previous page and verify return to page 1

**Expected Results:**
  - Pagination controls are visible and functional
  - Results display 15 items per page as expected
  - Next/Previous links navigate through pages
  - URL updates with page parameter
  - Going back to page 1 shows original results

#### 2.6. Individual State Laws detail page displays complete content

**File:** `tests/state-laws/state-laws-detail.spec.ts`

**Steps:**
  1. Navigate to State Laws page and click 'Read more' for first result
  2. Verify page displays law title, state, and section number
  3. Verify law description/summary is displayed
  4. Verify issue category tags are shown (e.g., 'Fee Schedules', 'Risk—Physicians Taking')
  5. Verify full law text is displayed with proper formatting
  6. Verify bold text highlights key provisions
  7. Verify external link to full statute is provided

**Expected Results:**
  - Detail page loads with complete law information
  - All metadata (state, section, date) is displayed
  - Full law text is readable and properly formatted
  - Key provisions are highlighted appropriately
  - External links to source documents are functional

#### 2.7. Clicking state on map filters State Laws results

**File:** `tests/state-laws/state-laws-map-click.spec.ts`

**Steps:**
  1. Navigate to State Laws page
  2. Click on California on the interactive map
  3. Verify State dropdown value changes to 'California'
  4. Verify results filter to show California laws only
  5. Verify result count matches 'California (63)' from dropdown
  6. Verify URL contains state parameter

**Expected Results:**
  - Clicking state on map updates dropdown selection
  - Results filter to show only selected state's laws
  - Result count updates appropriately
  - URL reflects selected state in parameters

### 3. Federal Laws Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. Federal Laws page loads with filter options

**File:** `tests/federal-laws/federal-laws-page.spec.ts`

**Steps:**
  1. Navigate to /federal-law
  2. Verify page title displays 'Federal Laws | Managed Care Contracting'
  3. Verify 'Filter by' section is visible with issue categories
  4. Verify results display 'Displaying 1 - 15 of 49 results'
  5. Verify pagination shows 'Page 1 of 4'

**Expected Results:**
  - Page loads successfully with correct title
  - Filter panel is visible and functional
  - Results show 49 total federal laws
  - Pagination controls work correctly

#### 3.2. Federal Laws filtering works correctly

**File:** `tests/federal-laws/federal-laws-filter.spec.ts`

**Steps:**
  1. Navigate to Federal Laws page
  2. Verify available filters include Medicare Advantage and ERISA specific categories
  3. Click 'Risk-Physicians Taking-Med. Adv. (4)' checkbox
  4. Verify results filter to show 4 matching laws
  5. Verify all results display 'Risk-Physicians Taking-Med. Adv.' tag
  6. Clear filter and verify all results return

**Expected Results:**
  - Federal-specific filters are available
  - Filtering works correctly with federal law categories
  - Results update appropriately as filters are applied
  - Filter can be cleared successfully

#### 3.3. Federal Laws detail page displays complete content

**File:** `tests/federal-laws/federal-laws-detail.spec.ts`

**Steps:**
  1. Navigate to Federal Laws page and click 'Read more' on first result
  2. Verify law title is displayed
  3. Verify CFR/USC reference is shown
  4. Verify law description is displayed
  5. Verify issue category tags are shown
  6. Verify full law text content is available

**Expected Results:**
  - Detail page displays federal law properly
  - Title, citation, and description are present
  - Issue tags are accurately displayed
  - Full law text is readable

### 4. AMA Policies Functionality

**Seed:** `tests/seed.spec.ts`

#### 4.1. AMA Policies page loads with filter options

**File:** `tests/ama-policies/ama-policies-page.spec.ts`

**Steps:**
  1. Navigate to /ama-policy
  2. Verify page title displays 'AMA Policies | Managed Care Contracting'
  3. Verify description text explains the content
  4. Verify 'Filter by' section is visible
  5. Verify results display 'Displaying 1 - 15 of 260 results'
  6. Verify pagination shows 'Page 1 of 18'

**Expected Results:**
  - Page loads successfully with correct title
  - Filter panel is visible
  - 260 total AMA policies are available
  - Pagination shows correct number of pages

#### 4.2. AMA Policies filtering works correctly

**File:** `tests/ama-policies/ama-policies-filter.spec.ts`

**Steps:**
  1. Navigate to AMA Policies page
  2. Click 'U.R. Criteria (39)' checkbox under Coverage/Utilization Review
  3. Verify results filter to show 39 policies
  4. Verify all results display 'U.R. Criteria' tag
  5. Click additional filters and verify multiple selections work
  6. Clear all filters and verify all 260 policies return

**Expected Results:**
  - Filters function correctly for AMA policies
  - Multiple filters can be applied simultaneously
  - Results update as filters are applied or removed
  - All policies can be displayed when filters are cleared

#### 4.3. AMA Policy detail page displays policy information

**File:** `tests/ama-policies/ama-policies-detail.spec.ts`

**Steps:**
  1. Navigate to AMA Policies page and click 'Read more' on first result
  2. Verify policy title is displayed (e.g., 'Third Party Payer Quantity Limits H-185.942')
  3. Verify policy number/code is shown
  4. Verify last update date is displayed
  5. Verify issue category tags are shown
  6. Verify policy content/text is readable

**Expected Results:**
  - Policy detail page loads correctly
  - Title, policy number, and date are displayed
  - Issue category tags are present
  - Policy content is readable and properly formatted

### 5. Search Functionality

**Seed:** `tests/seed.spec.ts`

#### 5.1. Search box is accessible on all pages

**File:** `tests/search/search-accessibility.spec.ts`

**Steps:**
  1. Navigate to homepage
  2. Verify search textbox is visible in the header
  3. Navigate to State Laws page
  4. Verify search textbox is still visible in the header
  5. Navigate to Federal Laws page
  6. Verify search textbox is still visible in the header

**Expected Results:**
  - Search box is consistently visible across all pages
  - Search box is accessible from header on every page
  - Search textbox is clearly labeled

#### 5.2. Global search from header returns results

**File:** `tests/search/search-global.spec.ts`

**Steps:**
  1. Navigate to homepage
  2. Click the search box in the header
  3. Type a search term (e.g., 'prior authorization')
  4. Click Apply button
  5. Verify results page displays relevant matches from all categories
  6. Verify result count is displayed

**Expected Results:**
  - Search box accepts text input
  - Apply button functions correctly
  - Results page displays matches
  - Results include relevant state laws, federal laws, and/or policies

#### 5.3. Search within State Laws works correctly

**File:** `tests/search/search-state-laws.spec.ts`

**Steps:**
  1. Navigate to State Laws page
  2. Verify search box is visible in the main content area
  3. Type 'prompt payment' in the search box
  4. Press Enter or click search button
  5. Verify results filter to show laws containing 'prompt payment'
  6. Verify help text is shown: 'To search for an exact phrase, enclose in quotation marks'

**Expected Results:**
  - Search box in State Laws page is functional
  - Keyword search filters results appropriately
  - Help text is visible to guide users on exact phrase search
  - Results contain search term in title or content

#### 5.4. Exact phrase search with quotation marks works

**File:** `tests/search/search-exact-phrase.spec.ts`

**Steps:**
  1. Navigate to State Laws page
  2. Type '"patient care"' (with quotes) in search box
  3. Press Enter
  4. Verify results only show laws with exact phrase 'patient care'
  5. Compare results with non-quoted search
  6. Verify quoted search returns fewer, more precise results

**Expected Results:**
  - Quotation mark syntax is recognized
  - Exact phrase search returns only matching phrases
  - Exact phrase search is more restrictive than keyword search
  - Help text regarding quotes is accurate

### 6. Feedback Form Functionality

**Seed:** `tests/seed.spec.ts`

#### 6.1. Feedback page loads with form fields

**File:** `tests/feedback/feedback-page.spec.ts`

**Steps:**
  1. Navigate to /feedback
  2. Verify page title displays 'Feedback | Managed Care Contracting'
  3. Verify introductory text is displayed
  4. Verify form contains 'Name' field marked as required
  5. Verify form contains 'Email' field marked as required
  6. Verify form contains 'Comment/Feedback' field marked as required
  7. Verify Submit button is present

**Expected Results:**
  - Feedback page loads with correct title
  - Introductory text explains the purpose of feedback
  - All three required form fields are visible
  - All fields are labeled correctly
  - Submit button is visible and accessible

#### 6.2. Feedback form validation works correctly

**File:** `tests/feedback/feedback-validation.spec.ts`

**Steps:**
  1. Navigate to Feedback page
  2. Click Submit button without filling any fields
  3. Verify validation error appears for Name field
  4. Fill in Name and Email but leave Comment empty
  5. Click Submit
  6. Verify validation error appears for Comment field
  7. Fill in all three fields with valid data
  8. Verify no validation errors appear

**Expected Results:**
  - Required field validation works for all three fields
  - Validation error messages are displayed for empty fields
  - Form can be submitted when all required fields are filled
  - Email field accepts valid email format

#### 6.3. Feedback form submission succeeds with valid data

**File:** `tests/feedback/feedback-submission.spec.ts`

**Steps:**
  1. Navigate to Feedback page
  2. Fill Name field with 'Test User'
  3. Fill Email field with 'test@example.com'
  4. Fill Comment field with 'This is test feedback'
  5. Click Submit button
  6. Verify form submission processes (page changes or success message appears)

**Expected Results:**
  - Form accepts valid data without errors
  - Submit button is functional
  - Form submission is processed successfully
  - User receives confirmation of submission

### 7. Footer and Additional Pages

**Seed:** `tests/seed.spec.ts`

#### 7.1. Footer contains all required links

**File:** `tests/footer/footer-links.spec.ts`

**Steps:**
  1. Navigate to any page on the site
  2. Scroll to footer
  3. Verify the following footer links are present:
  4.   - Additional Terms
  5.   - Accessibility Statement
  6.   - Code of Conduct
  7.   - Methodology
  8.   - Privacy Policy
  9.   - Terms of Use
  10. Verify social media links are present for Facebook, Twitter, Instagram, YouTube, LinkedIn

**Expected Results:**
  - All six required footer navigation links are present
  - All five social media links are visible
  - Footer is consistently displayed on all pages
  - Links are properly formatted with pipe separators

#### 7.2. Footer links navigate to correct destinations

**File:** `tests/footer/footer-navigation.spec.ts`

**Steps:**
  1. Navigate to any page and scroll to footer
  2. Click 'Methodology' link and verify navigation to /methodology page
  3. Go back and click 'Additional Terms' link and verify navigation
  4. Click a social media link (e.g., Facebook) and verify it opens AMA social media page
  5. Verify external links open in new tab/window

**Expected Results:**
  - All footer links are functional and navigate correctly
  - Internal links navigate to appropriate site pages
  - External links open to correct AMA social media pages
  - External links open in new tabs

#### 7.3. Accessibility Statement page is accessible

**File:** `tests/additional-pages/accessibility.spec.ts`

**Steps:**
  1. Navigate to Accessibility Statement link in footer
  2. Verify page loads successfully
  3. Verify page contains accessibility information
  4. Navigate back to homepage using browser back button
  5. Verify homepage loads correctly

**Expected Results:**
  - Accessibility Statement page loads properly
  - Content is readable and accessible
  - Navigation history is preserved
  - Back button navigation works correctly

### 8. Responsive Design and Cross-browser

**Seed:** `tests/seed.spec.ts`

#### 8.1. Homepage layout is responsive

**File:** `tests/responsive/homepage-responsive.spec.ts`

**Steps:**
  1. Navigate to homepage at desktop width (1920x1080)
  2. Verify all content cards are visible side-by-side
  3. Resize viewport to tablet width (768x1024)
  4. Verify content reorganizes appropriately
  5. Verify navigation menu is still accessible
  6. Resize viewport to mobile width (375x667)
  7. Verify content stacks vertically
  8. Verify all interactive elements remain accessible

**Expected Results:**
  - Homepage layout adapts to different screen sizes
  - Content remains readable at all breakpoints
  - Navigation is accessible on all devices
  - Interactive elements scale appropriately

#### 8.2. State Laws page map is responsive

**File:** `tests/responsive/state-laws-responsive.spec.ts`

**Steps:**
  1. Navigate to State Laws page at desktop width
  2. Verify map is fully visible and clickable
  3. Resize to tablet width
  4. Verify map remains usable and states are clickable
  5. Verify filter sidebar is accessible (collapsed menu on mobile if needed)
  6. Resize to mobile width
  7. Verify map scales appropriately
  8. Verify states remain selectable on mobile

**Expected Results:**
  - Map is responsive and usable on all screen sizes
  - All states remain clickable on mobile devices
  - Filter sidebar remains accessible
  - Layout does not break at any breakpoint
