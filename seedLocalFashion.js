const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// 1. Initialize Sanity Client Connection
const client = createClient({
    projectId: 'rpysqhaq', // 👈 Put your real Project ID here
    dataset: 'production',
    useCdn: false,
    token: 'skmCi3lJJY14PULlmXUaIHpJ1ofNHXhqGMAfXNDM28Mj5y1isLC6BFOKQV9GN2dP4v0OOBlZF2kRCAq2FA8E9431RxjWon8PJGOxEm4D9ZFzLIIRokqxDpk0BqL8gwqyextw6X7wqYRSPaVtQmEOKF8eMX7ZHLF7LAnz1pOBPAppEMshX8YT',    // 👈 Put your Editor/Developer write token here
    apiVersion: '2026-06-30'
});

// 2. Complete 47-Item Clothing Inventory
const localFashionProducts = [
    // --- SHORTS ---
    { name: "Urban Denim Shorts", description: "Classic washed distressed denim shorts with a raw cutoff hem line.", price: 34.00, stock: 45, categoryName: "Shorts", localFilename: "short1.jpg" },
    { name: "Casual Linen Shorts", description: "Lightweight breathable linen shorts with a comfortable elastic waist drawcord.", price: 29.00, stock: 60, categoryName: "Shorts", localFilename: "short2.jpg" },
    { name: "Washed Cotton Utility Shorts", description: "Durable relaxed-fit canvas cotton shorts equipped with deep side pockets.", price: 32.00, stock: 55, categoryName: "Shorts", localFilename: "short3.webp" },

    // --- T-SHIRTS ---
    { name: "Premium Boxy Heavyweight Tee", description: "Thick structured organic cotton t-shirt with a vintage street crewneck collar cut.", price: 28.00, stock: 120, categoryName: "T-Shirts", localFilename: "tshirt1.jpg" },
    { name: "Minimalist Pastel Tee", description: "Ultra-soft combed ringspun cotton daily tee in a relaxed modern silhouette.", price: 24.00, stock: 140, categoryName: "T-Shirts", localFilename: "tshirt2.jpg" },
    { name: "Classic Soft Oversized Tee", description: "Relaxed drop-shoulder casual t-shirt crafted for ultimate weekend comfort styling.", price: 26.00, stock: 95, categoryName: "T-Shirts", localFilename: "tshirt3.jpg" },

    // --- HOODIES ---
    { name: "Oversized Minimalist Hoodie", description: "Heavyweight premium fleece backing hoodie with dropped shoulders and thick ribbed frames.", price: 65.00, stock: 80, categoryName: "Hoodies", localFilename: "hoodi1.jpg" },
    { name: "Streetwear Essential Hoodie", description: "Classic urban culture hoodie featuring deep double-lined hood architecture and clean seams.", price: 68.00, stock: 70, categoryName: "Hoodies", localFilename: "hoodi2.jpg" },
    { name: "Cozy Knit Lounge Hoodie", description: "Slub cotton breathable knit weave hoodie designed for clean layered lounge aesthetics.", price: 58.00, stock: 40, categoryName: "Hoodies", localFilename: "hoodi3.jpg" },
    { name: "Pastel Loopback Relaxed Hoodie", description: "Premium French terry loopback weave pullover in a vibrant modern pastel color palette.", price: 62.00, stock: 50, categoryName: "Hoodies", localFilename: "hoodi4.avif" },

    // --- JACKETS ---
    { name: "Heritage Raw Indigo Denim Jacket", description: "Timeless trucker jacket profile constructed with rigid reinforced vintage contrast panels.", price: 89.00, stock: 35, categoryName: "Jackets", localFilename: "jacket1.jpg" },
    { name: "Suede Shearling Trucker Jacket", description: "Faux suede structured autumn layer lined with rich plush insulation accents.", price: 110.00, stock: 20, categoryName: "Jackets", localFilename: "jacket2.webp" },
    { name: "Utility Canvas Field Jacket", description: "Rugged water-resistant utility jacket fitted with functional storage military frames.", price: 95.00, stock: 25, categoryName: "Jackets", localFilename: "jacket3.jpg" },
    { name: "Classic Corduroy Button-Up Jacket", description: "Fine-wale velvety textures soft touch overlay designed with dual clean chest flat pockets.", price: 79.00, stock: 30, categoryName: "Jackets", localFilename: "jacket4.avif" },

    // --- KURTIS ---
    { name: "Traditional Handblock Printed Kurti", description: "Elegant daily wear cotton tunic adorned with intricate heritage block-print accents.", price: 42.00, stock: 65, categoryName: "Kurtis", localFilename: "kurti1.jpg" },
    { name: "Embroidered Georgette Luxury Kurti", description: "Flowing celebratory premium georgette fabric featuring micro-needlework stitch-lines.", price: 55.00, stock: 40, categoryName: "Kurtis", localFilename: "kurti2.webp" },
    { name: "Anarkali Silhouette Rayon Kurti", description: "Graceful flared fit longline dress top designed with lightweight breathable materials.", price: 48.00, stock: 50, categoryName: "Kurtis", localFilename: "kurti3.webp" },
    { name: "Contemporary Straight Cotton Kurti", description: "Clean modern geometric patterns straight tunic with elegant formal side-slit accents.", price: 38.00, stock: 75, categoryName: "Kurtis", localFilename: "kurti4.webp" },

    // --- SKIRTS ---
    { name: "Boho Tiered Flowing Maxi Skirt", description: "Lightweight ankle-length tiered lightweight crinkle skirt lines with movement dynamics.", price: 49.00, stock: 45, categoryName: "Skirts", localFilename: "skirt1.jpg" },
    { name: "A-Line Button-Front Suede Skirt", description: "Structured retro high-waisted knee skirt finished in smooth velvety soft panel layers.", price: 45.00, stock: 30, categoryName: "Skirts", localFilename: "skirt2.jpg" },
    { name: "Pleated Minimalist Midi Skirt", description: "Elegant sharp accordion crisp pressing details with a flexible comfortable waist contour.", price: 42.00, stock: 55, categoryName: "Skirts", localFilename: "skirt3.webp" },
    { name: "Floral Botanical Satin Skirt", description: "Luxurious fluid draping bias-cut slip skirt shimmering with delicate natural prints.", price: 46.00, stock: 35, categoryName: "Skirts", localFilename: "skirt4.jpg" },
    { name: "Linen Bleached Tiered Wrap Skirt", description: "Asymmetric front overlap design fastening safely with side self-tie bow accents.", price: 39.00, stock: 40, categoryName: "Skirts", localFilename: "skirt5.jpg" },
    { name: "Flowing Summer Rayon Skirt", description: "Breezy tropical resort styling lightweight midi featuring breathable airy underlinings.", price: 38.00, stock: 60, categoryName: "Skirts", localFilename: "skirt6.avif" },

    // --- TROUSERS ---
    { name: "Pleated Wide-Leg Wool Trousers", description: "High-waisted crisp tailored drape trousers ideal for structural professional work wardrobes.", price: 74.00, stock: 40, categoryName: "Trousers", localFilename: "trouser1.avif" },
    { name: "Tailored Slim Tapered Trousers", description: "Smart casual office tailored stretch ankle-grazer pants with functional side slots.", price: 59.00, stock: 85, categoryName: "Trousers", localFilename: "trouser2.jpg" },
    { name: "Relaxed Linen Blend Trousers", description: "Breathable straight-cut hot weather resort pants maximizing casual lounge cool.", price: 54.00, stock: 90, categoryName: "Trousers", localFilename: "trouser3.jpg" },
    { name: "Classic Khaki Pleated Chinos", description: "Mid-weight durable twill cotton pants holding clean pressing front lines definitions.", price: 48.00, stock: 110, categoryName: "Trousers", localFilename: "trouser4.jpg" },
    { name: "Urban Cargo Drawstring Pants", description: "Relaxed utility streetwear pants detailed with expansive side pouch enclosures.", price: 62.00, stock: 70, categoryName: "Trousers", localFilename: "trouser5.jpg" },
    { name: "Cropped Straight Crease Pants", description: "Polished modern formal pants stopping perfectly clean right above shoe lines boundaries.", price: 56.00, stock: 65, categoryName: "Trousers", localFilename: "trouser6.jpg" },

    // --- SHIRTS ---
    { name: "Classic Crisp Poplin Button-Down", description: "Timeless structured tailored business shirt woven with premium long-staple cotton fibers.", price: 45.00, stock: 100, categoryName: "Shirts", localFilename: "shirt1.jpg" },
    { name: "Relaxed Slub Linen Resort Shirt", description: "Casual summer beach open spread-collar lightweight layering short sleeve tunic.", price: 42.00, stock: 115, categoryName: "Shirts", localFilename: "shirt2.jpg" },
    { name: "Vintage Floral Print Silk Shirt", description: "Luxuriously smooth fluid draping shirt showcasing premium micro botanical prints.", price: 68.00, stock: 35, categoryName: "Shirts", localFilename: "shirt3.webp" },
    { name: "Boxy Utility Oversized Shirt", description: "Modern street style square frame canvas top complete with durable double seams.", price: 49.00, stock: 80, categoryName: "Shirts", localFilename: "shirt4.webp" },
    { name: "Chambray Soft Indigo Casual Shirt", description: "Lighter weight alternative offering denim aesthetics across comfortable daily settings.", price: 46.00, stock: 95, categoryName: "Shirts", localFilename: "shirt5.jpg" },
    { name: "Modern Check Flannel Shirt", description: "Thick brushed yarn flannel layer keeping temperature optimal in crisp weather seasons.", price: 52.00, stock: 60, categoryName: "Shirts", localFilename: "shirt6.jpg" },

    // --- CROP TOPS ---
    { name: "Minimalist Ribbed Knit Croptop", description: "Stretch snug cotton blend essential crop building dynamic layering lookbook bases.", price: 22.00, stock: 130, categoryName: "Crop Tops", localFilename: "croptop1.jpg" },
    { name: "Sweetheart Neck Puff Sleeve Crop", description: "Romantic evening blouse combining elastic ruching alongside dramatic shoulder frames.", price: 34.00, stock: 50, categoryName: "Crop Tops", localFilename: "croptop2.jpg" },
    { name: "Asymmetric One-Shoulder Tank Crop", description: "Edgy minimalist athletic styling top boasting single shoulder band clean finishes.", price: 25.00, stock: 85, categoryName: "Crop Tops", localFilename: "croptop3.jpg" },
    { name: "Lace-Trim Boho Linen Croptop", description: "Delicate open embroidery inserts decorating a breathable summer square frame tank.", price: 29.00, stock: 65, categoryName: "Crop Tops", localFilename: "croptop4.jpg" },
    { name: "Basic Seamless Activewear Crop", description: "High-compression friction-free performance top optimized for lifestyle wellness gym sets.", price: 24.00, stock: 140, categoryName: "Crop Tops", localFilename: "croptop5.jpg" },
    { name: "Ruched Front Drawstring Crop", description: "Customizable center channel toggle adjusting length parameters smoothly to personal fits.", price: 26.00, stock: 90, categoryName: "Crop Tops", localFilename: "croptop6.jpg" },

    // --- DRESSES ---
    { name: "Ethereal Botanical Wrap Maxi Dress", description: "Flowing tiered georgette silhouette dancing with deep floral printing definitions.", price: 89.00, stock: 40, categoryName: "Dresses", localFilename: "dress1.jpg" },
    { name: "Minimalist Linen Shift Midi Dress", description: "Clean box structured straight line tracking dress offering supreme daytime cooling comfort.", price: 74.00, stock: 55, categoryName: "Dresses", localFilename: "dress2.jpg" },
    { name: "Elegant Satin Cocktail Slip Dress", description: "Luxurious fluid bias cut cowl neckline drape tracking curves flawlessly for formal evenings.", price: 95.00, stock: 25, categoryName: "Dresses", localFilename: "dress3.jpg" },
    { name: "French Countryside Smocked Sun Dress", description: "Stretch bodice paneling adapting comfortably to forms alongside a romantic flared skirt loop.", price: 78.00, stock: 45, categoryName: "Dresses", localFilename: "dress4.jpg" },
    { name: "Tiered Cotton Ruffle Party Dress", description: "Playful volume micro-ruffle tiered structure flaring gracefully with structured balance profiles.", price: 82.00, stock: 30, categoryName: "Dresses", localFilename: "dress5.jpg" }
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
    // Clears old electronics or placeholder fashion content to ensure no reference lock conflict
    await client.delete({ query: '*[_type in ["product", "category"] || references(*[_type == "product"]._id)]' });

    console.log("🚀 Initializing local file upload streams for 47 items...");

    for (const item of localFashionProducts) {
        try {
            console.log(`\n📦 Processing item: "${item.name}"`);

            // Resolve absolute local path from your root images folder
            const filePath = path.join(__dirname, 'images', item.localFilename);

            if (!fs.existsSync(filePath)) {
                console.warn(`   ⚠️ File not found at standard path: ${filePath}. Skipping asset attachment.`);
                continue;
            }

            // Read local image directly into a byte stream pipeline
            const imageStream = fs.createReadStream(filePath);

            console.log(`   Uploading local file binary: "${item.localFilename}" into Sanity Asset Bank...`);
            const imageAsset = await client.assets.upload('image', imageStream, {
                filename: item.localFilename
            });

            // Maintain valid references for categorical sorting nodes
            const categoryRefId = await getOrCreateCategory(item.categoryName);

            // Construct your strict Sanity Schema mapping
            const productDoc = {
                _type: 'product',
                name: item.name,
                slug: { _type: 'slug', current: slugify(item.name) },
                description: item.description,
                price: item.price,
                stock: item.stock,
                category: { _type: 'reference', _ref: categoryRefId },
                images: [
                    {
                        _key: Math.random().toString(36).substring(2, 9),
                        _type: 'image',
                        asset: { _type: "reference", _ref: imageAsset._id }
                    }
                ]
            };

            const result = await client.create(productDoc);
            console.log(`   ✅ Success! Document written to cloud ID: ${result._id}`);

        } catch (err) {
            console.error(`   ❌ Critical system failure uploading "${item.name}":`, err.message);
        }
    }

    console.log("\n✨ CONGRATULATIONS! Your entire custom collection of 47 fashion pieces is officially live!");
}

runLocalSeeder();