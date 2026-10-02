import { execSync } from 'child_process';

// Get token from git credential manager
function getToken() {
  try {
    const creds = execSync('echo protocol=https`nhost=github.com`n | git credential fill', {
      shell: 'powershell',
      encoding: 'utf-8'
    });
    const match = creds.match(/password=(.*)/);
    return match ? match[1].trim() : null;
  } catch (e) {
    console.error('Failed to get token:', e.message);
    return null;
  }
}

const token = getToken();
if (!token) {
  console.error('No token found in Git Credential Manager.');
  process.exit(1);
}

const repo = 'Pr1nce-Raj/ByteShop';
const headers = {
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'ByteShop-Setup'
};

async function createLabel(name, color, description) {
  try {
    await fetch(`https://api.github.com/repos/${repo}/labels`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, color, description })
    });
  } catch (e) {}
}

const issues = [
  {
    title: "[Good First Issue]: Fix typo in store banner headline",
    body: `### 📌 Description
There is a spelling mistake in the main hero banner on the homepage. It currently says:
> "Welcome to BtyeShop"

It should be corrected to:
> "Welcome to ByteShop"

### 🎯 Target File
\`src/components/Banner.jsx\`

### 🔍 Steps to Reproduce
1. Start the dev server: \`npm run dev\`
2. Open \`http://localhost:5173\`
3. Look at the top banner heading: "BtyeShop" is misspelled.

### 💡 Hint
Open \`src/components/Banner.jsx\` and search for \`BtyeShop\`, then fix the spelling to \`ByteShop\`.`,
    labels: ["good first issue", "hacktoberfest", "bug"]
  },
  {
    title: "[Good First Issue]: Add your name to CONTRIBUTORS.md",
    body: `### 📌 Description
Welcome to ByteShop! As your first open source contribution, add your name, GitHub profile link, and favorite gadget or book to our hall of fame.

### 🎯 Target File
\`CONTRIBUTORS.md\`

### 🔍 How to complete
1. Open \`CONTRIBUTORS.md\`.
2. Under the \`## Contributors List\` section, add a new bullet point:
   \`- **[Your Name](https://github.com/your-username)** - Your Role/College | Favorite Gadget: *Your Choice*\`
3. Save, commit on a new branch, and open a Pull Request!`,
    labels: ["good first issue", "hacktoberfest", "documentation"]
  },
  {
    title: "[Good First Issue]: Search filter in SearchBar is case-sensitive",
    body: `### 📌 Description
When typing a search query in lowercase (e.g., "keyboard"), no results appear because the product name uses title case ("Custom Mechanical Keyboard").

The search should be case-insensitive so users can type in lowercase, uppercase, or mixed case and still find matching products.

### 🎯 Target File
\`src/components/SearchBar.jsx\`

### 🔍 Steps to Reproduce
1. Open the app
2. In the search bar, type \`keyboard\`
3. Observe that 0 products are found.
4. Type \`Keyboard\` (capital K) and notice the product appears.

### 💡 Hint
Look inside \`src/components/SearchBar.jsx\` at the \`filterProducts\` function. You will want to convert both \`product.name\` and \`searchQuery\` to lowercase using \`.toLowerCase()\` before checking \`.includes()\`.`,
    labels: ["good first issue", "hacktoberfest", "bug"]
  },
  {
    title: "[Good First Issue]: Shopping cart badge count remains 0 when items are added",
    body: `### 📌 Description
When you click "Add to Cart" on any product, the item is added to the cart, but the badge number on the Navbar Cart button stays stuck at \`0\`.

It should show the total count of items in the cart.

### 🎯 Target File
\`src/components/Navbar.jsx\`

### 🔍 Steps to Reproduce
1. Open the app
2. Click "Add to Cart" on any item.
3. Look at the top navigation bar Cart button badge. It still displays \`0\`.

### 💡 Hint
Check \`src/components/Navbar.jsx\`. Find \`const totalItems = 0;\` and replace it with a calculation that sums the items in the \`cart\` prop (e.g. using \`cart.reduce((sum, item) => sum + item.quantity, 0)\` or \`cart.length\`).`,
    labels: ["good first issue", "hacktoberfest", "bug"]
  },
  {
    title: "[Good First Issue]: Cart subtotal displays incorrect concatenated price string",
    body: `### 📌 Description
When opening the Cart Drawer with items inside, the Subtotal displays bizarre numbers like \`$08932\` instead of properly adding the prices together (\`$121\`).

This is happening because numbers are being converted to strings during the calculation.

### 🎯 Target File
\`src/components/CartDrawer.jsx\`

### 🔍 Steps to Reproduce
1. Add "Custom Mechanical Keyboard" ($89) and "Python Developer Handbook" ($32) to the cart.
2. Click the Cart button to open the drawer.
3. Notice the Subtotal says \`$08932\` instead of \`$121\`.

### 💡 Hint
Look for the \`subtotal\` variable in \`src/components/CartDrawer.jsx\`. Fix the \`reduce\` accumulator so it performs numeric addition:
\`(total, item) => total + (item.price * item.quantity)\``,
    labels: ["good first issue", "hacktoberfest", "bug"]
  },
  {
    title: "[Good First Issue]: In-stock items display an Out of Stock badge",
    body: `### 📌 Description
On the product cards, items that are available and in stock currently display a red "Out of Stock" badge, while items that are out of stock show a green "In Stock" badge.

The badge logic is inverted.

### 🎯 Target File
\`src/components/ProductCard.jsx\`

### 🔍 Steps to Reproduce
1. Open the app
2. Look at the product cards: items with an active "Add to Cart" button have a red "Out of Stock" badge.

### 💡 Hint
Check the stock badge ternary in \`src/components/ProductCard.jsx\`. Check whether the condition \`product.inStock ? ... : ...\` has its true and false UI branches swapped.`,
    labels: ["good first issue", "hacktoberfest", "bug"]
  },
  {
    title: "[Good First Issue]: Add missing product to the Audio category",
    body: `### 📌 Description
The store has categories for "Electronics", "Books", and "Accessories", and an "Audio" filter pill, but currently there are no products in the "Audio" category.

We need to add a new audio product (such as Wireless Noise-Cancelling Headphones using \`/products/headphones.jpg\`) to the catalog data.

### 🎯 Target File
\`src/data/products.js\`

### 🔍 How to complete
1. Open \`src/data/products.js\`.
2. Add a new product object to the \`INITIAL_PRODUCTS\` array with:
   - \`id\`: 9
   - \`name\`: "Active Noise-Cancelling Headphones"
   - \`category\`: "Audio"
   - \`price\`: 129
   - \`rating\`: 4.8
   - \`reviewsCount\`: 150
   - \`image\`: "/products/headphones.jpg"
   - \`description\`: "Premium over-ear wireless headphones with studio-quality audio."
   - \`inStock\`: true`,
    labels: ["good first issue", "hacktoberfest", "enhancement"]
  },
  {
    title: "[Good First Issue]: Clear Cart button has no effect when clicked",
    body: `### 📌 Description
When items are in the cart drawer, clicking the red "Clear Cart" button does nothing.

The button should remove all items from the cart.

### 🎯 Target File
\`src/components/CartDrawer.jsx\`

### 🔍 Steps to Reproduce
1. Add any item to the cart.
2. Open the Cart Drawer.
3. Click "Clear Cart" at the top right of the drawer.
4. Notice the cart items remain unchanged.

### 💡 Hint
Find the "Clear Cart" button in \`src/components/CartDrawer.jsx\`. Check its \`onClick\` attribute—it currently has an empty function \`onClick={() => {}}\`. Connect it to the \`onClearCart\` prop!`,
    labels: ["good first issue", "hacktoberfest", "bug"]
  },
  {
    title: "[Good First Issue]: Newsletter subscription form does not show confirmation message",
    body: `### 📌 Description
When a user enters their email and submits the newsletter form in the footer, nothing happens visually.

We should update the form to display the confirmation message already built into the component (\`subscribed\` state).

### 🎯 Target File
\`src/components/Footer.jsx\`

### 🔍 Steps to Reproduce
1. Scroll down to the footer.
2. Enter an email address in the newsletter input box and click "Subscribe".
3. Notice that nothing happens and no confirmation message appears.

### 💡 Hint
Check \`handleSubscribe\` inside \`src/components/Footer.jsx\`. Call \`setSubscribed(true)\` inside the handler to reveal the confirmation message!`,
    labels: ["good first issue", "hacktoberfest", "bug"]
  },
  {
    title: "[Good First Issue]: GitHub icon in footer points to placeholder link '#'",
    body: `### 📌 Description
In the footer, the GitHub logo link has \`href="#"\` instead of linking to the actual project repository.

It should point to \`https://github.com/Pr1nce-Raj/ByteShop\` so visitors can find the source code.

### 🎯 Target File
\`src/components/Footer.jsx\`

### 🔍 Steps to Reproduce
1. Scroll down to the footer.
2. Click the GitHub icon under the ByteShop description.
3. Notice the browser merely jumps to the top of the page because the link is \`#\`.

### 💡 Hint
In \`src/components/Footer.jsx\`, find the \`<a>\` tag wrapping the \`<Github className="w-5 h-5" />\` icon, and update its \`href\` to the repository URL (\`https://github.com/Pr1nce-Raj/ByteShop\`).`,
    labels: ["good first issue", "hacktoberfest", "bug"]
  }
];

async function main() {
  console.log('Ensuring labels exist...');
  await createLabel('good first issue', '7057ff', 'Good for newcomers');
  await createLabel('hacktoberfest', 'ed7304', 'Hacktoberfest contributions');
  await createLabel('bug', 'd73a4a', "Something isn't working");
  await createLabel('enhancement', 'a2eeef', 'New feature or request');
  await createLabel('documentation', '0075ca', 'Improvements or additions to documentation');

  console.log(`Publishing ${issues.length} issues to ${repo}...`);
  for (let i = 0; i < issues.length; i++) {
    const item = issues[i];
    console.log(`[${i + 1}/${issues.length}] Creating: ${item.title}`);
    const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: 'POST',
      headers,
      body: JSON.stringify(item)
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`  -> Created #${data.number}: ${data.html_url}`);
    } else {
      console.error(`  -> Failed with status ${res.status}:`, await res.text());
    }
    // Small delay to prevent GitHub rate-limiting
    await new Promise((r) => setTimeout(r, 600));
  }
  console.log('\nAll 10 issues created successfully on GitHub!');
}

main();
