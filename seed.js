const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// 1. Initialize Sanity Client Connection
const client = createClient({
    projectId: 'rpysqhaq',
    dataset: 'production',
    useCdn: false,
    token: 'skmCi3lJJY14PULlmXUaIHpJ1ofNHXhqGMAfXNDM28Mj5y1isLC6BFOKQV9GN2dP4v0OOBlZF2kRCAq2FA8E9431RxjWon8PJGOxEm4D9ZFzLIIRokqxDpk0BqL8gwqyextw6X7wqYRSPaVtQmEOKF8eMX7ZHLF7LAnz1pOBPAppEMshX8YT',
    apiVersion: '2026-06-30'
});

// 2. Complete Clothing Inventory with Grouped Images (11,12,13 / 21,22,23 / 31,32,33 pattern)
const localFashionProducts = [
    // --- SHORTS (4 items) ---
    { name: "Urban Denim Shorts", description: "Classic washed distressed denim shorts with a raw cutoff hem line.", price: 34.00, stock: 45, categoryName: "Shorts", imageFilenames: ["short11.avif", "short12.avif", "short13.avif"] },
    { name: "Casual Linen Shorts", description: "Lightweight breathable linen shorts with a comfortable elastic waist drawcord.", price: 29.00, stock: 60, categoryName: "Shorts", imageFilenames: ["short21.avif", "short22.avif", "short23.avif"] },
    { name: "Washed Cotton Utility Shorts", description: "Durable relaxed-fit canvas cotton shorts equipped with deep side pockets.", price: 32.00, stock: 55, categoryName: "Shorts", imageFilenames: ["short31.avif", "short32.avif", "short33.avif"] },
    { name: "Athletic Performance Shorts", description: "High-performance technical shorts with moisture-wicking fabric and secure pockets.", price: 36.00, stock: 50, categoryName: "Shorts", imageFilenames: ["short41.avif", "short42.avif", "short43.avif"] },

    // --- T-SHIRTS (4 items) ---
    { name: "Premium Boxy Heavyweight Tee", description: "Thick structured organic cotton t-shirt with a vintage street crewneck collar cut.", price: 28.00, stock: 120, categoryName: "T-Shirts", imageFilenames: ["tshirt11.avif", "tshirt12.avif", "tshirt13.avif"] },
    { name: "Minimalist Pastel Tee", description: "Ultra-soft combed ringspun cotton daily tee in a relaxed modern silhouette.", price: 24.00, stock: 140, categoryName: "T-Shirts", imageFilenames: ["tshirt21.avif", "tshirt22.avif", "tshirt23.avif"] },
    { name: "Classic Soft Oversized Tee", description: "Relaxed drop-shoulder casual t-shirt crafted for ultimate weekend comfort styling.", price: 26.00, stock: 95, categoryName: "T-Shirts", imageFilenames: ["tshirt31.avif", "tshirt32.avif", "tshirt33.avif"] },
    { name: "Graphic Print Heritage Tee", description: "Statement graphic t-shirt with artistic cultural designs.", price: 29.00, stock: 85, categoryName: "T-Shirts", imageFilenames: ["tshirt41.avif", "tshirt42.avif", "tshirt43.avif"] },

    // --- HOODIES (4 items) ---
    { name: "Oversized Minimalist Hoodie", description: "Heavyweight premium fleece backing hoodie with dropped shoulders and thick ribbed frames.", price: 65.00, stock: 80, categoryName: "Hoodies", imageFilenames: ["hoodi11.avif", "hoodi12.avif", "hoodi13.avif"] },
    { name: "Streetwear Essential Hoodie", description: "Classic urban culture hoodie featuring deep double-lined hood architecture and clean seams.", price: 68.00, stock: 70, categoryName: "Hoodies", imageFilenames: ["hoodi21.avif", "hoodi22.avif", "hoodi23.avif"] },
    { name: "Cozy Knit Lounge Hoodie", description: "Slub cotton breathable knit weave hoodie designed for clean layered lounge aesthetics.", price: 58.00, stock: 40, categoryName: "Hoodies", imageFilenames: ["hoodi31.avif", "hoodi32.avif", "hoodi33.avif"] },
    { name: "Pastel Loopback Relaxed Hoodie", description: "Premium French terry loopback weave pullover in a vibrant modern pastel color palette.", price: 62.00, stock: 50, categoryName: "Hoodies", imageFilenames: ["hoodi41.avif", "hoodi42.avif", "hoodi43.avif"] },

    // --- JACKETS (4 items) ---
    { name: "Heritage Raw Indigo Denim Jacket", description: "Timeless trucker jacket profile constructed with rigid reinforced vintage contrast panels.", price: 89.00, stock: 35, categoryName: "Jackets", imageFilenames: ["jacket11.avif", "jacket12.avif", "jacket13.avif"] },
    { name: "Suede Shearling Trucker Jacket", description: "Faux suede structured autumn layer lined with rich plush insulation accents.", price: 110.00, stock: 20, categoryName: "Jackets", imageFilenames: ["jacket21.avif", "jacket22.avif", "jacket23.avif"] },
    { name: "Utility Canvas Field Jacket", description: "Rugged water-resistant utility jacket fitted with functional storage military frames.", price: 95.00, stock: 25, categoryName: "Jackets", imageFilenames: ["jacket31.avif", "jacket32.avif", "jacket33.avif"] },
    { name: "Classic Corduroy Button-Up Jacket", description: "Fine-wale velvety textures soft touch overlay designed with dual clean chest flat pockets.", price: 79.00, stock: 30, categoryName: "Jackets", imageFilenames: ["jacket41.avif", "jacket42.avif", "jacket43.avif"] },

    // --- KURTIS (4 items) ---
    { name: "Traditional Handblock Printed Kurti", description: "Elegant daily wear cotton tunic adorned with intricate heritage block-print accents.", price: 42.00, stock: 65, categoryName: "Kurtis", imageFilenames: ["kurti11.avif", "kurti12.avif", "kurti13.avif"] },
    { name: "Embroidered Georgette Luxury Kurti", description: "Flowing celebratory premium georgette fabric featuring micro-needlework stitch-lines.", price: 55.00, stock: 40, categoryName: "Kurtis", imageFilenames: ["kurti21.avif", "kurti22.avif", "kurti23.avif"] },
    { name: "Anarkali Silhouette Rayon Kurti", description: "Graceful flared fit longline dress top designed with lightweight breathable materials.", price: 48.00, stock: 50, categoryName: "Kurtis", imageFilenames: ["kurti31.avif", "kurti32.avif", "kurti33.avif"] },
    { name: "Contemporary Straight Cotton Kurti", description: "Clean modern geometric patterns straight tunic with elegant formal side-slit accents.", price: 38.00, stock: 75, categoryName: "Kurtis", imageFilenames: ["kurti41.avif", "kurti42.avif", "kurti43.avif"] },

    // --- SKIRTS (6 items) ---
    { name: "Boho Tiered Flowing Maxi Skirt", description: "Lightweight ankle-length tiered lightweight crinkle skirt lines with movement dynamics.", price: 49.00, stock: 45, categoryName: "Skirts", imageFilenames: ["skirt11.avif", "skirt12.avif", "skirt13.avif"] },
    { name: "A-Line Button-Front Suede Skirt", description: "Structured retro high-waisted knee skirt finished in smooth velvety soft panel layers.", price: 45.00, stock: 30, categoryName: "Skirts", imageFilenames: ["skirt21.avif", "skirt22.avif", "skirt23.avif"] },
    { name: "Pleated Minimalist Midi Skirt", description: "Elegant sharp accordion crisp pressing details with a flexible comfortable waist contour.", price: 42.00, stock: 55, categoryName: "Skirts", imageFilenames: ["skirt31.avif", "skirt32.avif", "skirt33.avif"] },
    { name: "Floral Botanical Satin Skirt", description: "Luxurious fluid draping bias-cut slip skirt shimmering with delicate natural prints.", price: 46.00, stock: 35, categoryName: "Skirts", imageFilenames: ["skirt41.avif", "skirt42.avif", "skirt43.avif"] },
    { name: "Linen Bleached Tiered Wrap Skirt", description: "Asymmetric front overlap design fastening safely with side self-tie bow accents.", price: 39.00, stock: 40, categoryName: "Skirts", imageFilenames: ["skirt51.avif", "skirt52.avif", "skirt53.avif"] },
    { name: "Flowing Summer Rayon Skirt", description: "Breezy tropical resort styling lightweight midi featuring breathable airy underlinings.", price: 38.00, stock: 60, categoryName: "Skirts", imageFilenames: ["skirt61.avif", "skirt62.avif", "skirt63.avif"] },

    // --- TROUSERS (6 items) ---
    { name: "Pleated Wide-Leg Wool Trousers", description: "High-waisted crisp tailored drape trousers ideal for structural professional work wardrobes.", price: 74.00, stock: 40, categoryName: "Trousers", imageFilenames: ["trouser11.avif", "trouser12.avif", "trouser13.avif"] },
    { name: "Tailored Slim Tapered Trousers", description: "Smart casual office tailored stretch ankle-grazer pants with functional side slots.", price: 59.00, stock: 85, categoryName: "Trousers", imageFilenames: ["trouser21.avif", "trouser22.avif", "trouser23.avif"] },
    { name: "Relaxed Linen Blend Trousers", description: "Breathable straight-cut hot weather resort pants maximizing casual lounge cool.", price: 54.00, stock: 90, categoryName: "Trousers", imageFilenames: ["trouser31.avif", "trouser32.avif", "trouser33.avif"] },
    { name: "Classic Khaki Pleated Chinos", description: "Mid-weight durable twill cotton pants holding clean pressing front lines definitions.", price: 48.00, stock: 110, categoryName: "Trousers", imageFilenames: ["trouser41.avif", "trouser42.avif", "trouser43.avif"] },
    { name: "Urban Cargo Drawstring Pants", description: "Relaxed utility streetwear pants detailed with expansive side pouch enclosures.", price: 62.00, stock: 70, categoryName: "Trousers", imageFilenames: ["trouser51.avif", "trouser52.avif", "trouser53.avif"] },
    { name: "Cropped Straight Crease Pants", description: "Polished modern formal pants stopping perfectly clean right above shoe lines boundaries.", price: 56.00, stock: 65, categoryName: "Trousers", imageFilenames: ["trouser61.avif", "trouser62.avif", "trouser63.avif"] },

    // --- SHIRTS (6 items) ---
    { name: "Classic Crisp Poplin Button-Down", description: "Timeless structured tailored business shirt woven with premium long-staple cotton fibers.", price: 45.00, stock: 100, categoryName: "Shirts", imageFilenames: ["shirt11.avif", "shirt12.avif", "shirt13.avif"] },
    { name: "Relaxed Slub Linen Resort Shirt", description: "Casual summer beach open spread-collar lightweight layering short sleeve tunic.", price: 42.00, stock: 115, categoryName: "Shirts", imageFilenames: ["shirt21.avif", "shirt22.avif", "shirt23.avif"] },
    { name: "Vintage Floral Print Silk Shirt", description: "Luxuriously smooth fluid draping shirt showcasing premium micro botanical prints.", price: 68.00, stock: 35, categoryName: "Shirts", imageFilenames: ["shirt31.avif", "shirt32.avif", "shirt33.avif"] },
    { name: "Boxy Utility Oversized Shirt", description: "Modern street style square frame canvas top complete with durable double seams.", price: 49.00, stock: 80, categoryName: "Shirts", imageFilenames: ["shirt41.avif", "shirt42.avif", "shirt43.avif"] },
    { name: "Chambray Soft Indigo Casual Shirt", description: "Lighter weight alternative offering denim aesthetics across comfortable daily settings.", price: 46.00, stock: 95, categoryName: "Shirts", imageFilenames: ["shirt51.avif", "shirt52.avif", "shirt53.avif"] },
    { name: "Modern Check Flannel Shirt", description: "Thick brushed yarn flannel layer keeping temperature optimal in crisp weather seasons.", price: 52.00, stock: 60, categoryName: "Shirts", imageFilenames: ["shirt61.avif", "shirt62.avif", "shirt63.avif"] },

    // --- CROP TOPS (5 items) ---
    { name: "Minimalist Ribbed Knit Croptop", description: "Stretch snug cotton blend essential crop building dynamic layering lookbook bases.", price: 22.00, stock: 130, categoryName: "Crop Tops", imageFilenames: ["croptop11.avif", "croptop12.avif", "croptop13.avif"] },
    { name: "Sweetheart Neck Puff Sleeve Crop", description: "Romantic evening blouse combining elastic ruching alongside dramatic shoulder frames.", price: 34.00, stock: 50, categoryName: "Crop Tops", imageFilenames: ["croptop21.avif", "croptop22.avif", "croptop23.avif"] },
    { name: "Asymmetric One-Shoulder Tank Crop", description: "Edgy minimalist athletic styling top boasting single shoulder band clean finishes.", price: 25.00, stock: 85, categoryName: "Crop Tops", imageFilenames: ["croptop31.avif", "croptop32.avif", "croptop33.avif"] },
    { name: "Lace-Trim Boho Linen Croptop", description: "Delicate open embroidery inserts decorating a breathable summer square frame tank.", price: 29.00, stock: 65, categoryName: "Crop Tops", imageFilenames: ["croptop41.avif", "croptop42.avif", "croptop43.avif"] },
    { name: "Basic Seamless Activewear Crop", description: "High-compression friction-free performance top optimized for lifestyle wellness gym sets.", price: 24.00, stock: 140, categoryName: "Crop Tops", imageFilenames: ["croptop51.avif"] },

    // --- DRESSES (6 items) ---
    { name: "Ethereal Botanical Wrap Maxi Dress", description: "Flowing tiered georgette silhouette dancing with deep floral printing definitions.", price: 89.00, stock: 40, categoryName: "Dresses", imageFilenames: ["dress11.avif", "dress12.avif", "dress13.avif"] },
    { name: "Minimalist Linen Shift Midi Dress", description: "Clean box structured straight line tracking dress offering supreme daytime cooling comfort.", price: 74.00, stock: 55, categoryName: "Dresses", imageFilenames: ["dress21.avif", "dress22.avif", "dress23.avif"] },
    { name: "Elegant Satin Cocktail Slip Dress", description: "Luxurious fluid bias cut cowl neckline drape tracking curves flawlessly for formal evenings.", price: 95.00, stock: 25, categoryName: "Dresses", imageFilenames: ["dress31.avif", "dress32.avif", "dress33.avif"] },
    { name: "French Countryside Smocked Sun Dress", description: "Stretch bodice paneling adapting comfortably to forms alongside a romantic flared skirt loop.", price: 78.00, stock: 45, categoryName: "Dresses", imageFilenames: ["dress41.avif", "dress42.avif", "dress43.avif"] },
    { name: "Tiered Cotton Ruffle Party Dress", description: "Playful volume micro-ruffle tiered structure flaring gracefully with structured balance profiles.", price: 82.00, stock: 30, categoryName: "Dresses", imageFilenames: ["dress51.avif", "dress52.avif", "dress53.avif"] },
    { name: "Casual Summer Print Dress", description: "Breezy lightweight summer dress perfect for warm weather styling.", price: 65.00, stock: 48, categoryName: "Dresses", imageFilenames: ["dress61.avif", "dress62.avif", "dress63.avif"] }
];

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function getOrCreateCategory(categoryName) {
    const slug = slugify(categoryName);
    const categoryId = `cat-${slug}`;
    await client.createIfNotExists({
        _id: categoryId,
        _type: 'category',
        name: categoryName,
        title: categoryName,
        slug: { _type: 'slug', current: slug }
    });
    return categoryId;
}

async function runLocalSeeder() {
    console.log("🧹 Wiping old product and category entries safely...");
    await client.delete({ query: '*[_type in ["product", "category"]]' });

    console.log("🚀 Starting multi-image upload for your 47 fashion items with galleries...\n");

    let successCount = 0;
    let failureCount = 0;

    for (const item of localFashionProducts) {
        try {
            console.log(`\n📦 Processing: "${item.name}"`);

            // Get or create category reference
            const categoryRefId = await getOrCreateCategory(item.categoryName);

            // Array to hold all uploaded image assets for this product
            const uploadedImages = [];

            // Upload each image for this product
            for (const filename of item.imageFilenames) {
                const filePath = path.join(__dirname, 'images', filename);

                if (!fs.existsSync(filePath)) {
                    console.warn(`   ⚠️ Image not found: ${filename}`);
                    continue;
                }

                try {
                    const imageStream = fs.createReadStream(filePath);
                    console.log(`   📸 Uploading: ${filename}`);

                    const imageAsset = await client.assets.upload('image', imageStream, {
                        filename: filename
                    });

                    uploadedImages.push({
                        _key: Math.random().toString(36).substring(2, 9),
                        _type: 'image',
                        asset: { _type: "reference", _ref: imageAsset._id }
                    });

                } catch (imgErr) {
                    console.error(`   ❌ Failed to upload ${filename}:`, imgErr.message);
                }
            }

            // Only create product if at least one image was uploaded
            if (uploadedImages.length > 0) {
                const productDoc = {
                    _type: 'product',
                    name: item.name,
                    slug: { _type: 'slug', current: slugify(item.name) },
                    description: item.description,
                    price: item.price,
                    stock: item.stock,
                    category: { _type: 'reference', _ref: categoryRefId },
                    images: uploadedImages
                };

                const result = await client.create(productDoc);
                console.log(`   ✅ Success! ${uploadedImages.length} images uploaded. ID: ${result._id}`);
                successCount++;
            } else {
                console.warn(`   ⚠️ No images uploaded for "${item.name}". Skipping product creation.`);
                failureCount++;
            }

        } catch (err) {
            console.error(`   ❌ Error processing "${item.name}":`, err.message);
            failureCount++;
        }
    }

    console.log("\n" + "=".repeat(60));
    console.log("✨ SEEDING COMPLETE!");
    console.log(`✅ Successfully created: ${successCount} products`);
    console.log(`❌ Failed: ${failureCount} products`);
    console.log("=".repeat(60));
}

runLocalSeeder();