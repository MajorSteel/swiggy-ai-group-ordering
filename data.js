/**
 * ============================================================
 * SWIGGY CLONE — MOCK DATA
 * Author: Vivek Kumar (Enroll: 23125038, Email: vivek_k@mfs.iitr.ac.in)
 * Copyright (c) 2026 Vivek Kumar. All rights reserved.
 * ============================================================
 * All mock data for the Swiggy food delivery clone with
 * AI Group Ordering features. Globally accessible via
 * window.AppData = { ... }
 *
 * Sections:
 *   1. categories          – 12 food category tiles
 *   2. restaurants         – 12 restaurants with full menus
 *   3. filters             – Filter bar options
 *   4. groupMembers        – Sample group order members
 *   5. aiResponses         – Pre-written AI dialogue strings
 *   6. promotionalBanners  – Hero carousel banners
 * ============================================================
 */

window.AppData = {

  /* ----------------------------------------------------------
   * 1. CATEGORIES
   * 12 food-type tiles shown in the horizontal scroll strip.
   * `image` uses emoji as a visual placeholder.
   * ---------------------------------------------------------- */
  categories: [
    { id: 'cat-1',  name: 'Pizza',        image: '🍕' },
    { id: 'cat-2',  name: 'Biryani',      image: '🍛' },
    { id: 'cat-3',  name: 'Burgers',      image: '🍔' },
    { id: 'cat-4',  name: 'Chinese',      image: '🥡' },
    { id: 'cat-5',  name: 'North Indian', image: '🍲' },
    { id: 'cat-6',  name: 'South Indian', image: '🫓' },
    { id: 'cat-7',  name: 'Desserts',     image: '🍰' },
    { id: 'cat-8',  name: 'Rolls',        image: '🌯' },
    { id: 'cat-9',  name: 'Thali',        image: '🍽️' },
    { id: 'cat-10', name: 'Dosa',         image: '🥞' },
    { id: 'cat-11', name: 'Cakes',        image: '🎂' },
    { id: 'cat-12', name: 'Ice Cream',    image: '🍦' }
  ],

  /* ----------------------------------------------------------
   * 2. RESTAURANTS
   * 12 restaurant objects, each containing a full `menu` array
   * with 3-4 categories and 3-5 items per category.
   * ---------------------------------------------------------- */
  restaurants: [

    // ── 1. Meghana Foods ────────────────────────────────────
    {
      id: 'rest-1',
      name: 'Meghana Foods',
      image: 'Rustic Indian restaurant with warm lighting and clay pots of biryani',
      rating: 4.5,
      ratingCount: '10.2K+',
      cuisines: ['Biryani', 'North Indian'],
      deliveryTime: '25-30 min',
      priceForTwo: 500,
      distance: '2.1 km',
      discount: '40% OFF up to ₹80',
      promoted: true,
      veg: false,
      menu: [
        {
          category: 'Biryani',
          items: [
            { id: 'm1-1', name: 'Hyderabadi Chicken Dum Biryani', price: 329, description: 'Slow-cooked basmati rice layered with succulent chicken, saffron & aromatic spices, served with raita and salan', veg: false, rating: 4.6, bestseller: true, image: 'Steaming pot of golden biryani topped with fried onions and mint' },
            { id: 'm1-2', name: 'Mutton Biryani', price: 449, description: 'Tender mutton pieces layered with long-grain basmati, slow-cooked in sealed handi with whole spices', veg: false, rating: 4.5, bestseller: false, image: 'Rich mutton biryani garnished with boiled egg and coriander' },
            { id: 'm1-3', name: 'Paneer Biryani', price: 279, description: 'Soft paneer cubes with fragrant basmati rice, caramelised onions and fresh mint', veg: true, rating: 4.3, bestseller: false, image: 'Vegetarian biryani with paneer cubes and saffron strands' },
            { id: 'm1-4', name: 'Egg Biryani', price: 249, description: 'Fluffy basmati rice with boiled eggs marinated in spicy masala gravy', veg: false, rating: 4.2, bestseller: false, image: 'Egg biryani with halved eggs and crispy onions' }
          ]
        },
        {
          category: 'Starters',
          items: [
            { id: 'm1-5', name: 'Chicken 65', price: 249, description: 'Deep-fried chicken marinated in red chilli paste, curry leaves & ginger-garlic', veg: false, rating: 4.4, bestseller: true, image: 'Crispy red chicken 65 with curry leaves' },
            { id: 'm1-6', name: 'Paneer Tikka', price: 229, description: 'Chargrilled cottage cheese cubes in tandoori marinade with bell peppers & onions', veg: true, rating: 4.3, bestseller: false, image: 'Grilled paneer tikka on skewers' },
            { id: 'm1-7', name: 'Mutton Seekh Kebab', price: 299, description: 'Minced mutton kebabs with aromatic spices, grilled in tandoor', veg: false, rating: 4.5, bestseller: false, image: 'Seekh kebabs on a sizzling plate with onion rings' }
          ]
        },
        {
          category: 'Curries',
          items: [
            { id: 'm1-8', name: 'Butter Chicken', price: 299, description: 'Creamy tomato-based gravy with tender tandoori chicken chunks, finished with butter and cream', veg: false, rating: 4.6, bestseller: false, image: 'Rich orange butter chicken in a copper bowl' },
            { id: 'm1-9', name: 'Dal Makhani', price: 199, description: 'Black lentils slow-cooked overnight with butter, cream and aromatic spices', veg: true, rating: 4.4, bestseller: false, image: 'Creamy dal makhani garnished with cream swirl' },
            { id: 'm1-10', name: 'Chicken Chettinad', price: 319, description: 'South Indian style spicy chicken curry with freshly ground chettinad masala', veg: false, rating: 4.3, bestseller: false, image: 'Dark spicy chicken curry with curry leaves' }
          ]
        },
        {
          category: 'Breads',
          items: [
            { id: 'm1-11', name: 'Butter Naan', price: 59, description: 'Soft leavened bread baked in tandoor, brushed with butter', veg: true, rating: 4.2, bestseller: false, image: 'Golden butter naan on a wooden board' },
            { id: 'm1-12', name: 'Garlic Naan', price: 69, description: 'Tandoor-baked naan topped with minced garlic and coriander', veg: true, rating: 4.3, bestseller: false, image: 'Garlic naan with herbs' },
            { id: 'm1-13', name: 'Rumali Roti', price: 39, description: 'Paper-thin whole wheat bread, folded like a handkerchief', veg: true, rating: 4.0, bestseller: false, image: 'Thin rumali roti folded on plate' }
          ]
        }
      ]
    },

    // ── 2. Pizza Hut ────────────────────────────────────────
    {
      id: 'rest-2',
      name: 'Pizza Hut',
      image: 'Modern Pizza Hut outlet with red and white branding, wood-fired oven visible',
      rating: 4.2,
      ratingCount: '5.8K+',
      cuisines: ['Pizza', 'Italian'],
      deliveryTime: '30-35 min',
      priceForTwo: 400,
      distance: '3.4 km',
      discount: '₹125 OFF above ₹249',
      promoted: false,
      veg: false,
      menu: [
        {
          category: 'Pizzas',
          items: [
            { id: 'ph-1', name: 'Margherita Pizza', price: 199, description: 'Classic pizza with 100% mozzarella cheese on a rich tomato base', veg: true, rating: 4.3, bestseller: true, image: 'Classic margherita pizza with basil leaves' },
            { id: 'ph-2', name: 'Chicken Supreme', price: 449, description: 'Loaded with chicken tikka, sausage, pepperoni, and onions on cheese burst crust', veg: false, rating: 4.4, bestseller: true, image: 'Loaded chicken pizza with melted cheese pull' },
            { id: 'ph-3', name: 'Veggie Paradise', price: 349, description: 'Capsicum, mushroom, corn, olives, jalapeños on Italian herb crust', veg: true, rating: 4.1, bestseller: false, image: 'Colourful veggie pizza with fresh toppings' },
            { id: 'ph-4', name: 'Pepperoni Feast', price: 499, description: 'Generous pepperoni slices with extra mozzarella on pan crust', veg: false, rating: 4.5, bestseller: false, image: 'Pepperoni pizza with crispy edges' }
          ]
        },
        {
          category: 'Sides',
          items: [
            { id: 'ph-5', name: 'Garlic Breadsticks', price: 139, description: 'Freshly baked breadsticks with garlic butter and herbs, served with marinara dip', veg: true, rating: 4.2, bestseller: false, image: 'Golden garlic breadsticks with dipping sauce' },
            { id: 'ph-6', name: 'Chicken Wings (6 pcs)', price: 269, description: 'Crispy chicken wings tossed in spicy buffalo sauce', veg: false, rating: 4.3, bestseller: false, image: 'Spicy chicken wings on a plate' },
            { id: 'ph-7', name: 'Loaded Wedges', price: 179, description: 'Potato wedges topped with cheese sauce, jalapeños and sour cream', veg: true, rating: 4.0, bestseller: false, image: 'Cheesy potato wedges' }
          ]
        },
        {
          category: 'Pasta',
          items: [
            { id: 'ph-8', name: 'Creamy Alfredo Pasta', price: 249, description: 'Penne tossed in white cream sauce with mushrooms and herbs', veg: true, rating: 4.1, bestseller: false, image: 'Creamy white pasta in a bowl' },
            { id: 'ph-9', name: 'Chicken Arrabbiata', price: 279, description: 'Fusilli in spicy red tomato sauce with grilled chicken chunks', veg: false, rating: 4.2, bestseller: false, image: 'Red sauce pasta with chicken' },
            { id: 'ph-10', name: 'Mac and Cheese', price: 229, description: 'Elbow macaroni in creamy three-cheese sauce, baked golden', veg: true, rating: 4.4, bestseller: false, image: 'Bubbly baked mac and cheese' }
          ]
        },
        {
          category: 'Beverages',
          items: [
            { id: 'ph-11', name: 'Pepsi (475ml)', price: 99, description: 'Chilled Pepsi served with ice', veg: true, rating: 3.9, bestseller: false, image: 'Pepsi glass with ice cubes' },
            { id: 'ph-12', name: 'Iced Tea', price: 129, description: 'Refreshing lemon iced tea', veg: true, rating: 4.0, bestseller: false, image: 'Glass of iced tea with lemon wedge' },
            { id: 'ph-13', name: 'Chocolate Lava Cake', price: 109, description: 'Warm chocolate cake with a gooey molten center', veg: true, rating: 4.5, bestseller: false, image: 'Chocolate lava cake with melting center' }
          ]
        }
      ]
    },

    // ── 3. Burger King ──────────────────────────────────────
    {
      id: 'rest-3',
      name: 'Burger King',
      image: 'Burger King restaurant with flame-grilled signage and neon lights',
      rating: 4.1,
      ratingCount: '4.5K+',
      cuisines: ['Burgers', 'American'],
      deliveryTime: '20-25 min',
      priceForTwo: 350,
      distance: '1.8 km',
      discount: '60% OFF up to ₹120',
      promoted: true,
      veg: false,
      menu: [
        {
          category: 'Burgers',
          items: [
            { id: 'bk-1', name: 'Whopper', price: 229, description: 'Flame-grilled 100% beef patty with lettuce, tomato, pickles, onions and mayo on a sesame seed bun', veg: false, rating: 4.3, bestseller: true, image: 'Flame-grilled Whopper with all toppings' },
            { id: 'bk-2', name: 'Crispy Veg Burger', price: 129, description: 'Crunchy veg patty with lettuce, mayo, and fresh veggies', veg: true, rating: 4.0, bestseller: false, image: 'Crispy veg burger with golden patty' },
            { id: 'bk-3', name: 'Chicken Tandoori Grill', price: 199, description: 'Grilled chicken patty with tandoori sauce, onions and lettuce', veg: false, rating: 4.2, bestseller: true, image: 'Tandoori chicken burger with char marks' },
            { id: 'bk-4', name: 'BK Veggie Strips Burger', price: 149, description: 'Crispy veggie strips with chipotle sauce and fresh lettuce', veg: true, rating: 4.1, bestseller: false, image: 'Veg strips burger with chipotle drizzle' },
            { id: 'bk-5', name: 'Double Patty Chicken Burger', price: 299, description: 'Two flame-grilled chicken patties, cheese, pickles, onion, and BK special sauce', veg: false, rating: 4.4, bestseller: false, image: 'Towering double chicken burger' }
          ]
        },
        {
          category: 'Sides & Fries',
          items: [
            { id: 'bk-6', name: 'Classic Fries (Medium)', price: 109, description: 'Golden crispy French fries seasoned with salt', veg: true, rating: 4.1, bestseller: false, image: 'Box of golden French fries' },
            { id: 'bk-7', name: 'Piri Piri Fries', price: 129, description: 'Fries tossed in spicy piri piri seasoning', veg: true, rating: 4.2, bestseller: false, image: 'Red-dusted piri piri fries' },
            { id: 'bk-8', name: 'Chicken Nuggets (6 pcs)', price: 159, description: 'Tender chicken nuggets with a crispy golden coating, served with dipping sauce', veg: false, rating: 4.0, bestseller: false, image: 'Crispy chicken nuggets with sauce' }
          ]
        },
        {
          category: 'Beverages & Desserts',
          items: [
            { id: 'bk-9', name: 'BK Thick Shake — Chocolate', price: 149, description: 'Rich and creamy chocolate milkshake', veg: true, rating: 4.3, bestseller: false, image: 'Thick chocolate shake with whipped cream' },
            { id: 'bk-10', name: 'Coca-Cola (400ml)', price: 79, description: 'Chilled Coca-Cola', veg: true, rating: 3.9, bestseller: false, image: 'Coke glass with ice' },
            { id: 'bk-11', name: 'Sundae — Caramel', price: 69, description: 'Soft-serve vanilla ice cream drizzled with caramel sauce', veg: true, rating: 4.2, bestseller: false, image: 'Caramel sundae in a cup' }
          ]
        }
      ]
    },

    // ── 4. Chai Point ───────────────────────────────────────
    {
      id: 'rest-4',
      name: 'Chai Point',
      image: 'Cosy Chai Point café with earthy tones, chai glasses on wooden counter',
      rating: 4.3,
      ratingCount: '3.1K+',
      cuisines: ['Beverages', 'Snacks'],
      deliveryTime: '15-20 min',
      priceForTwo: 200,
      distance: '1.2 km',
      discount: '20% OFF up to ₹50',
      promoted: false,
      veg: true,
      menu: [
        {
          category: 'Chai',
          items: [
            { id: 'cp-1', name: 'Masala Chai', price: 99, description: 'Robust CTC tea brewed with ginger, cardamom, cinnamon & cloves in full-fat milk', veg: true, rating: 4.6, bestseller: true, image: 'Steaming glass of masala chai with whole spices' },
            { id: 'cp-2', name: 'Ginger Chai', price: 99, description: 'Strong ginger-infused tea brewed kadak style', veg: true, rating: 4.4, bestseller: false, image: 'Ginger tea with ginger slices' },
            { id: 'cp-3', name: 'Kulhad Chai', price: 119, description: 'Authentic clay-pot chai with earthy smoky flavour', veg: true, rating: 4.5, bestseller: false, image: 'Chai served in traditional clay kulhad' },
            { id: 'cp-4', name: 'Iced Chai Latte', price: 149, description: 'Chilled spiced chai blended with cold milk and ice', veg: true, rating: 4.2, bestseller: false, image: 'Iced chai latte in a tall glass' }
          ]
        },
        {
          category: 'Snacks',
          items: [
            { id: 'cp-5', name: 'Vada Pav', price: 69, description: 'Mumbai-style spiced potato fritter in a soft pav bun with chutneys', veg: true, rating: 4.3, bestseller: true, image: 'Vada pav with green chutney' },
            { id: 'cp-6', name: 'Samosa (2 pcs)', price: 59, description: 'Crispy triangular pastry filled with spiced potato and peas', veg: true, rating: 4.1, bestseller: false, image: 'Golden samosas with mint chutney' },
            { id: 'cp-7', name: 'Butter Toast', price: 49, description: 'Thick white bread slices toasted golden with Amul butter', veg: true, rating: 4.0, bestseller: false, image: 'Buttery toast on a plate' },
            { id: 'cp-8', name: 'Paneer Puff', price: 79, description: 'Flaky puff pastry filled with spiced paneer mixture', veg: true, rating: 4.2, bestseller: false, image: 'Golden paneer puff pastry' }
          ]
        },
        {
          category: 'Coffee & Cold Drinks',
          items: [
            { id: 'cp-9', name: 'Classic Cold Coffee', price: 149, description: 'Chilled coffee blended with milk, sugar and ice cream', veg: true, rating: 4.3, bestseller: false, image: 'Cold coffee with ice cream on top' },
            { id: 'cp-10', name: 'Cappuccino', price: 139, description: 'Espresso topped with steamed milk foam', veg: true, rating: 4.1, bestseller: false, image: 'Cappuccino with latte art' },
            { id: 'cp-11', name: 'Hot Chocolate', price: 159, description: 'Rich Belgian cocoa drink topped with marshmallows', veg: true, rating: 4.4, bestseller: false, image: 'Hot chocolate with marshmallows' }
          ]
        }
      ]
    },

    // ── 5. Empire Restaurant ────────────────────────────────
    {
      id: 'rest-5',
      name: 'Empire Restaurant',
      image: 'Iconic Empire Restaurant with green neon signage, bustling late-night crowd',
      rating: 4.4,
      ratingCount: '8.7K+',
      cuisines: ['Biryani', 'Chinese', 'North Indian'],
      deliveryTime: '30-35 min',
      priceForTwo: 450,
      distance: '3.0 km',
      discount: '30% OFF up to ₹75',
      promoted: false,
      veg: false,
      menu: [
        {
          category: 'Biryani',
          items: [
            { id: 'em-1', name: 'Empire Special Chicken Biryani', price: 299, description: 'Signature Empire-style biryani with tender chicken, aromatic spices and saffron rice', veg: false, rating: 4.5, bestseller: true, image: 'Empire signature biryani with boiled egg' },
            { id: 'em-2', name: 'Mutton Kheema Biryani', price: 399, description: 'Minced mutton cooked with whole spices and layered with fragrant basmati', veg: false, rating: 4.4, bestseller: false, image: 'Kheema biryani with fried onions' },
            { id: 'em-3', name: 'Veg Dum Biryani', price: 229, description: 'Mixed vegetables with mint and saffron rice, sealed and slow cooked', veg: true, rating: 4.2, bestseller: false, image: 'Colourful veg biryani in clay pot' }
          ]
        },
        {
          category: 'Chinese',
          items: [
            { id: 'em-4', name: 'Chicken Manchurian (Dry)', price: 249, description: 'Crispy chicken balls tossed in spicy Indo-Chinese Manchurian sauce', veg: false, rating: 4.3, bestseller: true, image: 'Crispy chicken manchurian with spring onions' },
            { id: 'em-5', name: 'Veg Fried Rice', price: 179, description: 'Wok-tossed rice with mixed vegetables, soy sauce and a hint of vinegar', veg: true, rating: 4.1, bestseller: false, image: 'Fried rice with colourful vegetables' },
            { id: 'em-6', name: 'Chicken Noodles', price: 219, description: 'Hakka noodles stir-fried with chicken strips, veggies and soy sauce', veg: false, rating: 4.2, bestseller: false, image: 'Plate of chicken hakka noodles' },
            { id: 'em-7', name: 'Gobi Manchurian', price: 199, description: 'Crispy cauliflower florets in tangy Manchurian sauce', veg: true, rating: 4.0, bestseller: false, image: 'Gobi manchurian with sauce drizzle' }
          ]
        },
        {
          category: 'Kebabs & Starters',
          items: [
            { id: 'em-8', name: 'Tandoori Chicken (Full)', price: 449, description: 'Whole chicken marinated in yoghurt and spices, roasted in tandoor', veg: false, rating: 4.5, bestseller: false, image: 'Red tandoori chicken on a sizzler' },
            { id: 'em-9', name: 'Fish Fry (2 pcs)', price: 269, description: 'Crispy fried fish fillets with south Indian spice coating', veg: false, rating: 4.3, bestseller: false, image: 'Crispy fried fish with lemon wedge' },
            { id: 'em-10', name: 'Mushroom Pepper Fry', price: 199, description: 'Button mushrooms stir-fried with cracked pepper, curry leaves and onions', veg: true, rating: 4.1, bestseller: false, image: 'Pepper mushroom fry in a bowl' }
          ]
        },
        {
          category: 'Breads & Rotis',
          items: [
            { id: 'em-11', name: 'Butter Naan', price: 49, description: 'Soft tandoor naan with a generous brush of butter', veg: true, rating: 4.1, bestseller: false, image: 'Hot butter naan' },
            { id: 'em-12', name: 'Parotta (2 pcs)', price: 59, description: 'Layered flaky South Indian parotta', veg: true, rating: 4.3, bestseller: false, image: 'Flaky layered parotta' },
            { id: 'em-13', name: 'Tandoori Roti', price: 35, description: 'Whole wheat roti baked in clay tandoor', veg: true, rating: 4.0, bestseller: false, image: 'Tandoori roti with char marks' }
          ]
        }
      ]
    },

    // ── 6. Paradise Biryani ─────────────────────────────────
    {
      id: 'rest-6',
      name: 'Paradise Biryani',
      image: 'Grand Paradise Biryani restaurant with Hyderabadi architectural details',
      rating: 4.6,
      ratingCount: '15.3K+',
      cuisines: ['Biryani', 'Kebabs'],
      deliveryTime: '35-40 min',
      priceForTwo: 600,
      distance: '4.2 km',
      discount: null,
      promoted: true,
      veg: false,
      menu: [
        {
          category: 'Signature Biryani',
          items: [
            { id: 'pb-1', name: 'Paradise Special Chicken Biryani', price: 399, description: 'The legendary Hyderabadi dum biryani with succulent chicken, aged basmati and hand-pounded spices', veg: false, rating: 4.7, bestseller: true, image: 'Paradise signature biryani in copper handi' },
            { id: 'pb-2', name: 'Mutton Dum Biryani', price: 499, description: 'Tender mutton slow-cooked with saffron-infused basmati in sealed handi', veg: false, rating: 4.6, bestseller: true, image: 'Rich mutton biryani with ghee drizzle' },
            { id: 'pb-3', name: 'Prawns Biryani', price: 549, description: 'Fresh prawns with coconut milk-infused rice and coastal spices', veg: false, rating: 4.5, bestseller: false, image: 'Prawns biryani with curry leaves' },
            { id: 'pb-4', name: 'Vegetable Dum Biryani', price: 299, description: 'Seasonal vegetables with fragrant rice, fried onions and whole spices', veg: true, rating: 4.3, bestseller: false, image: 'Veg biryani with saffron strands' }
          ]
        },
        {
          category: 'Kebabs',
          items: [
            { id: 'pb-5', name: 'Shami Kebab (4 pcs)', price: 279, description: 'Finely minced mutton patties with chana dal and aromatic spices', veg: false, rating: 4.4, bestseller: false, image: 'Round shami kebabs with mint chutney' },
            { id: 'pb-6', name: 'Seekh Kebab', price: 299, description: 'Spiced minced lamb on skewers, charcoal grilled', veg: false, rating: 4.5, bestseller: false, image: 'Charred seekh kebabs on skewer' },
            { id: 'pb-7', name: 'Tangdi Kebab (4 pcs)', price: 349, description: 'Chicken drumsticks marinated overnight in yoghurt and spices, tandoor roasted', veg: false, rating: 4.3, bestseller: false, image: 'Juicy tangdi kebabs with lemon' }
          ]
        },
        {
          category: 'Curries',
          items: [
            { id: 'pb-8', name: 'Mirchi ka Salan', price: 199, description: 'Hyderabadi-style green chilli curry with peanut and sesame gravy', veg: true, rating: 4.4, bestseller: false, image: 'Green chilli salan in a bowl' },
            { id: 'pb-9', name: 'Double Ka Meetha', price: 149, description: 'Hyderabadi bread pudding soaked in sweetened milk with dry fruits', veg: true, rating: 4.6, bestseller: false, image: 'Golden double ka meetha with nuts' },
            { id: 'pb-10', name: 'Bagara Baingan', price: 219, description: 'Baby eggplants in rich peanut, coconut and sesame curry', veg: true, rating: 4.2, bestseller: false, image: 'Stuffed eggplant curry' }
          ]
        }
      ]
    },

    // ── 7. Domino's Pizza ───────────────────────────────────
    {
      id: 'rest-7',
      name: "Domino's Pizza",
      image: 'Domino\'s outlet with blue and red branding, pizza delivery bikes parked outside',
      rating: 4.0,
      ratingCount: '7.4K+',
      cuisines: ['Pizza', 'Italian', 'Fast Food'],
      deliveryTime: '20-25 min',
      priceForTwo: 400,
      distance: '1.5 km',
      discount: 'FREE DELIVERY',
      promoted: false,
      veg: false,
      menu: [
        {
          category: 'Veg Pizzas',
          items: [
            { id: 'dp-1', name: 'Farmhouse Pizza', price: 299, description: 'Capsicum, mushroom, onion, tomato on a bed of mozzarella with herb crust', veg: true, rating: 4.2, bestseller: true, image: 'Farmhouse pizza with fresh vegetables' },
            { id: 'dp-2', name: 'Peppy Paneer', price: 349, description: 'Paneer cubes with capsicum, red paprika on cheesy crust', veg: true, rating: 4.3, bestseller: false, image: 'Peppy paneer pizza slice' },
            { id: 'dp-3', name: 'Mexican Green Wave', price: 329, description: 'Onion, capsicum, tomato, jalapeños with Mexican herb seasoning', veg: true, rating: 4.1, bestseller: false, image: 'Mexican green wave pizza' }
          ]
        },
        {
          category: 'Non-Veg Pizzas',
          items: [
            { id: 'dp-4', name: 'Chicken Dominator', price: 499, description: 'Double chicken — tikka, keema, sausage and grilled chicken on a cheese burst base', veg: false, rating: 4.4, bestseller: true, image: 'Loaded chicken dominator pizza' },
            { id: 'dp-5', name: 'Pepper Barbecue Chicken', price: 399, description: 'Chicken chunks with barbecue sauce, capsicum and onion', veg: false, rating: 4.3, bestseller: false, image: 'BBQ chicken pizza with sauce drizzle' },
            { id: 'dp-6', name: 'Non-Veg Supreme', price: 449, description: 'Pepperoni, chicken sausage, chicken tikka, grilled chicken, crispy chicken', veg: false, rating: 4.2, bestseller: false, image: 'Loaded non-veg supreme pizza' }
          ]
        },
        {
          category: 'Sides & Desserts',
          items: [
            { id: 'dp-7', name: 'Stuffed Garlic Bread', price: 159, description: 'Cheesy garlic bread stuffed with corn and cheese', veg: true, rating: 4.3, bestseller: false, image: 'Stuffed garlic bread oozing cheese' },
            { id: 'dp-8', name: 'Taco Mexicana Veg', price: 119, description: 'Crispy taco shell with spiced veg filling, salsa and cheese', veg: true, rating: 4.0, bestseller: false, image: 'Crunchy veg taco' },
            { id: 'dp-9', name: 'Choco Lava Cake', price: 109, description: 'Warm chocolate cake with a molten chocolate center', veg: true, rating: 4.5, bestseller: false, image: 'Oozing choco lava cake' }
          ]
        }
      ]
    },

    // ── 8. Behrouz Biryani ──────────────────────────────────
    {
      id: 'rest-8',
      name: 'Behrouz Biryani',
      image: 'Royal Behrouz Biryani with Mughal-inspired gold and black packaging',
      rating: 4.3,
      ratingCount: '6.2K+',
      cuisines: ['Biryani', 'Mughlai'],
      deliveryTime: '35-40 min',
      priceForTwo: 550,
      distance: '3.8 km',
      discount: '₹100 OFF above ₹499',
      promoted: false,
      veg: false,
      menu: [
        {
          category: 'Royal Biryanis',
          items: [
            { id: 'bb-1', name: 'Dum Gosht Biryani', price: 449, description: 'Slow-cooked mutton in an authentic royal Mughlai recipe with 22 hand-picked spices', veg: false, rating: 4.5, bestseller: true, image: 'Royal dum gosht biryani in golden box' },
            { id: 'bb-2', name: 'Murgh Makhani Biryani', price: 389, description: 'Butter chicken style gravy biryani with creamy tomato base', veg: false, rating: 4.4, bestseller: false, image: 'Creamy chicken biryani' },
            { id: 'bb-3', name: 'Paneer Lucknowi Biryani', price: 329, description: 'Royal paneer biryani with saffron, rose water and kewra essence', veg: true, rating: 4.3, bestseller: true, image: 'Aromatic paneer biryani with rose petals' },
            { id: 'bb-4', name: 'Murgh Kofta Biryani', price: 419, description: 'Chicken kofta (meatballs) layered with basmati rice and Behrouz masala', veg: false, rating: 4.2, bestseller: false, image: 'Kofta biryani with meatballs visible' }
          ]
        },
        {
          category: 'Kebabs & Sides',
          items: [
            { id: 'bb-5', name: 'Murgh Seekh Kebab (4 pcs)', price: 269, description: 'Tender minced chicken kebabs with royal spice blend', veg: false, rating: 4.3, bestseller: false, image: 'Golden seekh kebabs' },
            { id: 'bb-6', name: 'Shahi Paneer Tikka', price: 229, description: 'Cottage cheese grilled with cream, cashew and royal spices', veg: true, rating: 4.1, bestseller: false, image: 'Creamy paneer tikka' },
            { id: 'bb-7', name: 'Chicken Tikka (6 pcs)', price: 299, description: 'Charcoal-grilled chicken tikka pieces in Behrouz marinade', veg: false, rating: 4.4, bestseller: false, image: 'Charred chicken tikka pieces' }
          ]
        },
        {
          category: 'Desserts',
          items: [
            { id: 'bb-8', name: 'Gulab Jamun (2 pcs)', price: 99, description: 'Soft milk dumplings soaked in rose-flavoured sugar syrup', veg: true, rating: 4.3, bestseller: false, image: 'Gulab jamun in syrup' },
            { id: 'bb-9', name: 'Shahi Tukda', price: 129, description: 'Royal bread pudding with condensed milk and pistachios', veg: true, rating: 4.5, bestseller: false, image: 'Rich shahi tukda with nuts' },
            { id: 'bb-10', name: 'Phirni', price: 109, description: 'Creamy rice pudding flavoured with cardamom, served chilled in a clay pot', veg: true, rating: 4.2, bestseller: false, image: 'Phirni in earthen pot' }
          ]
        }
      ]
    },

    // ── 9. McDonald's ───────────────────────────────────────
    {
      id: 'rest-9',
      name: "McDonald's",
      image: 'McDonald\'s outlet with golden arches, bright interior and self-order kiosks',
      rating: 4.1,
      ratingCount: '9.1K+',
      cuisines: ['Burgers', 'Fast Food'],
      deliveryTime: '15-20 min',
      priceForTwo: 300,
      distance: '0.8 km',
      discount: '₹50 OFF above ₹199',
      promoted: true,
      veg: false,
      menu: [
        {
          category: 'Burgers',
          items: [
            { id: 'mc-1', name: 'McChicken Burger', price: 159, description: 'Tender chicken patty with creamy mayo and shredded lettuce', veg: false, rating: 4.2, bestseller: true, image: 'McChicken with sesame bun' },
            { id: 'mc-2', name: 'McAloo Tikki Burger', price: 99, description: 'Crispy aloo tikki patty with tomato mayo and fresh onions', veg: true, rating: 4.3, bestseller: true, image: 'McAloo Tikki on tray' },
            { id: 'mc-3', name: 'Maharaja Mac (Chicken)', price: 249, description: 'Two grilled chicken patties with habanero sauce, jalapenos, cheese and veggies', veg: false, rating: 4.4, bestseller: false, image: 'Double-stacked Maharaja Mac' },
            { id: 'mc-4', name: 'McVeggie Burger', price: 129, description: 'Veggie patty with lettuce, mayo and a toasted bun', veg: true, rating: 4.0, bestseller: false, image: 'McVeggie burger with lettuce' }
          ]
        },
        {
          category: 'Wraps & Snacks',
          items: [
            { id: 'mc-5', name: 'Chicken McNuggets (9 pcs)', price: 219, description: 'Crispy chicken nuggets served with dipping sauces', veg: false, rating: 4.1, bestseller: false, image: 'Box of chicken McNuggets' },
            { id: 'mc-6', name: 'McSpicy Chicken Wrap', price: 199, description: 'Spicy chicken strip wrapped in a soft tortilla with veggies and chipotle sauce', veg: false, rating: 4.2, bestseller: false, image: 'McSpicy wrap cut in half' },
            { id: 'mc-7', name: 'Hash Browns (2 pcs)', price: 79, description: 'Golden crispy potato hash browns', veg: true, rating: 4.0, bestseller: false, image: 'Crispy hash browns' }
          ]
        },
        {
          category: 'Meals & Combos',
          items: [
            { id: 'mc-8', name: 'McChicken Meal', price: 279, description: 'McChicken burger with medium fries and a medium Coke', veg: false, rating: 4.2, bestseller: false, image: 'McChicken meal on tray' },
            { id: 'mc-9', name: 'McAloo Tikki Meal', price: 199, description: 'McAloo Tikki burger with medium fries and a medium Coke', veg: true, rating: 4.1, bestseller: false, image: 'McAloo Tikki combo meal' },
            { id: 'mc-10', name: 'Happy Meal (Veg)', price: 229, description: 'McVeggie burger, fries, apple slices, Coke and a fun toy', veg: true, rating: 4.3, bestseller: false, image: 'Happy Meal with toy' }
          ]
        },
        {
          category: 'Desserts & Beverages',
          items: [
            { id: 'mc-11', name: 'McFlurry Oreo', price: 149, description: 'Creamy vanilla soft serve blended with crushed Oreo cookie pieces', veg: true, rating: 4.5, bestseller: false, image: 'McFlurry Oreo cup' },
            { id: 'mc-12', name: 'Soft Serve Cone', price: 39, description: 'Swirled vanilla soft serve in a crispy cone', veg: true, rating: 4.4, bestseller: false, image: 'Vanilla soft serve cone' },
            { id: 'mc-13', name: 'Hot Fudge Sundae', price: 79, description: 'Vanilla soft serve topped with warm chocolate fudge', veg: true, rating: 4.3, bestseller: false, image: 'Hot fudge sundae in a cup' }
          ]
        }
      ]
    },

    // ── 10. Baskin Robbins ──────────────────────────────────
    {
      id: 'rest-10',
      name: 'Baskin Robbins',
      image: 'Colourful Baskin Robbins ice cream parlour with pink and blue branding',
      rating: 4.4,
      ratingCount: '2.8K+',
      cuisines: ['Desserts', 'Ice Cream'],
      deliveryTime: '20-25 min',
      priceForTwo: 400,
      distance: '2.3 km',
      discount: 'FREE DELIVERY',
      promoted: false,
      veg: true,
      menu: [
        {
          category: 'Ice Cream Scoops',
          items: [
            { id: 'br-1', name: 'Mississippi Mud', price: 179, description: 'Rich chocolate ice cream with brownie pieces and a chocolate fudge ribbon', veg: true, rating: 4.6, bestseller: true, image: 'Dark chocolate ice cream scoops in a cup' },
            { id: 'br-2', name: 'Pralines & Cream', price: 179, description: 'Vanilla ice cream with praline-coated pecan pieces and a caramel ribbon', veg: true, rating: 4.5, bestseller: true, image: 'Caramel pralines ice cream' },
            { id: 'br-3', name: 'Mango Tango', price: 169, description: 'Alphonso mango ice cream with real mango chunks', veg: true, rating: 4.4, bestseller: false, image: 'Bright yellow mango ice cream' },
            { id: 'br-4', name: 'Cotton Candy', price: 159, description: 'Pink cotton candy flavoured ice cream with candy swirls', veg: true, rating: 4.2, bestseller: false, image: 'Pink cotton candy ice cream' },
            { id: 'br-5', name: 'World Class Chocolate', price: 179, description: 'Premium dark and milk chocolate blend ice cream', veg: true, rating: 4.5, bestseller: false, image: 'Rich chocolate ice cream' }
          ]
        },
        {
          category: 'Sundaes',
          items: [
            { id: 'br-6', name: 'Hot Fudge Sundae', price: 249, description: 'Vanilla ice cream topped with hot fudge sauce, whipped cream and cherry', veg: true, rating: 4.5, bestseller: false, image: 'Classic hot fudge sundae' },
            { id: 'br-7', name: 'Banana Royale', price: 299, description: 'Three scoops of ice cream with banana, chocolate sauce, nuts and whipped cream', veg: true, rating: 4.3, bestseller: false, image: 'Banana split sundae' },
            { id: 'br-8', name: 'Brownie Sundae', price: 279, description: 'Warm chocolate brownie topped with ice cream, fudge and nuts', veg: true, rating: 4.6, bestseller: false, image: 'Brownie sundae with dripping fudge' }
          ]
        },
        {
          category: 'Shakes & Smoothies',
          items: [
            { id: 'br-9', name: 'Chocolate Milkshake', price: 229, description: 'Thick creamy milkshake made with World Class Chocolate ice cream', veg: true, rating: 4.3, bestseller: false, image: 'Tall chocolate milkshake' },
            { id: 'br-10', name: 'Strawberry Shake', price: 229, description: 'Fresh strawberry flavoured shake with real berry pieces', veg: true, rating: 4.2, bestseller: false, image: 'Pink strawberry milkshake' },
            { id: 'br-11', name: 'Mango Smoothie', price: 199, description: 'Blended mango ice cream with mango pulp and milk', veg: true, rating: 4.4, bestseller: false, image: 'Mango smoothie in a tall glass' }
          ]
        }
      ]
    },

    // ── 11. The Bowl Company ────────────────────────────────
    {
      id: 'rest-11',
      name: 'The Bowl Company',
      image: 'Modern healthy food outlet with wooden counters and fresh ingredient display',
      rating: 4.2,
      ratingCount: '1.9K+',
      cuisines: ['Healthy', 'Bowls'],
      deliveryTime: '25-30 min',
      priceForTwo: 350,
      distance: '2.7 km',
      discount: '20% OFF up to ₹60',
      promoted: false,
      veg: false,
      menu: [
        {
          category: 'Rice Bowls',
          items: [
            { id: 'tb-1', name: 'Teriyaki Chicken Bowl', price: 269, description: 'Grilled teriyaki chicken on steamed rice with pickled ginger, edamame and sesame dressing', veg: false, rating: 4.3, bestseller: true, image: 'Teriyaki chicken bowl with sesame' },
            { id: 'tb-2', name: 'Paneer Tikka Rice Bowl', price: 229, description: 'Spiced paneer tikka over fragrant rice with mint chutney and onion salad', veg: true, rating: 4.2, bestseller: false, image: 'Paneer tikka bowl with green chutney' },
            { id: 'tb-3', name: 'Korean BBQ Chicken Bowl', price: 289, description: 'Gochujang marinated chicken with kimchi, pickled radish and sticky rice', veg: false, rating: 4.4, bestseller: true, image: 'Korean BBQ bowl with colourful toppings' },
            { id: 'tb-4', name: 'Mexican Bean Bowl', price: 219, description: 'Spiced kidney beans, corn salsa, guacamole, sour cream on cilantro rice', veg: true, rating: 4.1, bestseller: false, image: 'Colourful Mexican rice bowl' }
          ]
        },
        {
          category: 'Salad Bowls',
          items: [
            { id: 'tb-5', name: 'Caesar Salad with Grilled Chicken', price: 299, description: 'Romaine lettuce, parmesan, croutons, grilled chicken with classic Caesar dressing', veg: false, rating: 4.3, bestseller: false, image: 'Fresh Caesar salad with chicken strips' },
            { id: 'tb-6', name: 'Greek Quinoa Bowl', price: 279, description: 'Quinoa, cucumber, cherry tomatoes, olives, feta cheese and lemon vinaigrette', veg: true, rating: 4.2, bestseller: false, image: 'Colourful Greek quinoa salad' },
            { id: 'tb-7', name: 'Asian Crunch Salad', price: 259, description: 'Shredded cabbage, carrots, edamame, mandarin, crispy wonton, sesame ginger dressing', veg: true, rating: 4.0, bestseller: false, image: 'Crunchy Asian salad with sesame' }
          ]
        },
        {
          category: 'Smoothie Bowls',
          items: [
            { id: 'tb-8', name: 'Açaí Berry Bowl', price: 349, description: 'Blended açaí with banana, topped with granola, coconut flakes, chia seeds and honey', veg: true, rating: 4.5, bestseller: false, image: 'Purple açaí bowl with toppings' },
            { id: 'tb-9', name: 'Tropical Mango Bowl', price: 299, description: 'Mango and pineapple blend topped with kiwi, passion fruit and toasted almonds', veg: true, rating: 4.3, bestseller: false, image: 'Yellow mango smoothie bowl' },
            { id: 'tb-10', name: 'Green Detox Bowl', price: 319, description: 'Spinach, banana, avocado blend topped with hemp seeds, berries and flaxseed', veg: true, rating: 4.1, bestseller: false, image: 'Green smoothie bowl with berries' }
          ]
        }
      ]
    },

    // ── 12. Mojo Pizza ──────────────────────────────────────
    {
      id: 'rest-12',
      name: 'Mojo Pizza',
      image: 'Trendy Mojo Pizza kitchen with wood-fired oven and urban graffiti walls',
      rating: 4.5,
      ratingCount: '4.1K+',
      cuisines: ['Pizza', 'Italian'],
      deliveryTime: '25-30 min',
      priceForTwo: 450,
      distance: '2.0 km',
      discount: 'BUY 1 GET 1 FREE',
      promoted: true,
      veg: false,
      menu: [
        {
          category: 'Classic Pizzas',
          items: [
            { id: 'mj-1', name: 'Double Cheese Margherita', price: 199, description: 'Double layer of 100% mozzarella on a classic tomato base with oregano', veg: true, rating: 4.5, bestseller: true, image: 'Cheesy margherita with stretch pull' },
            { id: 'mj-2', name: 'Peri Peri Chicken Pizza', price: 399, description: 'Spicy peri peri chicken, onions, jalapeños and red paprika on cheesy crust', veg: false, rating: 4.4, bestseller: true, image: 'Spicy peri peri chicken pizza' },
            { id: 'mj-3', name: 'BBQ Chicken Pizza', price: 449, description: 'Smoky BBQ chicken with caramelised onions, bell peppers and mozzarella', veg: false, rating: 4.3, bestseller: false, image: 'BBQ chicken pizza with smoky glaze' },
            { id: 'mj-4', name: 'Paneer Makhani Pizza', price: 349, description: 'Paneer cubes in a makhani (butter) base with capsicum and onion', veg: true, rating: 4.2, bestseller: false, image: 'Indian fusion paneer pizza' }
          ]
        },
        {
          category: 'Gourmet Pizzas',
          items: [
            { id: 'mj-5', name: 'Truffle Mushroom Pizza', price: 499, description: 'Sautéed mushrooms, truffle oil, parmesan, arugula on a thin crust base', veg: true, rating: 4.6, bestseller: false, image: 'Elegant truffle mushroom pizza' },
            { id: 'mj-6', name: 'Lamb Kheema Pizza', price: 549, description: 'Spiced lamb mince with mint, feta cheese and caramelised onions', veg: false, rating: 4.5, bestseller: false, image: 'Lamb kheema pizza with fresh mint' },
            { id: 'mj-7', name: 'Quattro Formaggi', price: 449, description: 'Four cheese pizza — mozzarella, cheddar, parmesan and gorgonzola', veg: true, rating: 4.4, bestseller: false, image: 'Four cheese pizza with golden crust' }
          ]
        },
        {
          category: 'Sides',
          items: [
            { id: 'mj-8', name: 'Cheesy Garlic Bread', price: 149, description: 'Freshly baked bread with roasted garlic butter and melted mozzarella', veg: true, rating: 4.3, bestseller: false, image: 'Cheesy garlic bread slices' },
            { id: 'mj-9', name: 'Spicy Chicken Wings (8 pcs)', price: 279, description: 'Crispy wings tossed in signature Mojo hot sauce', veg: false, rating: 4.2, bestseller: false, image: 'Saucy chicken wings on a platter' },
            { id: 'mj-10', name: 'Loaded Nachos', price: 199, description: 'Tortilla chips with cheese sauce, jalapeños, salsa and sour cream', veg: true, rating: 4.1, bestseller: false, image: 'Loaded nachos with toppings' }
          ]
        },
        {
          category: 'Beverages',
          items: [
            { id: 'mj-11', name: 'Virgin Mojito', price: 129, description: 'Refreshing lime and mint mocktail with soda', veg: true, rating: 4.2, bestseller: false, image: 'Green mojito with mint sprig' },
            { id: 'mj-12', name: 'Iced Americano', price: 149, description: 'Double-shot espresso over ice with cold water', veg: true, rating: 4.0, bestseller: false, image: 'Iced americano in a glass' },
            { id: 'mj-13', name: 'Coca-Cola (300ml)', price: 59, description: 'Chilled Coca-Cola can', veg: true, rating: 3.8, bestseller: false, image: 'Coke can with condensation' }
          ]
        }
      ]
    }
  ],

  /* ----------------------------------------------------------
   * 3. FILTERS
   * Quick-filter chips shown in the horizontal filter bar
   * below the search input on the home screen.
   * ---------------------------------------------------------- */
  filters: [
    { id: 'filter-1',  label: 'Sort',               icon: '⇅' },
    { id: 'filter-2',  label: 'Cuisines',            icon: '🍽️' },
    { id: 'filter-3',  label: 'Rating 4.0+',         icon: '⭐' },
    { id: 'filter-4',  label: 'Pure Veg',            icon: '🟢' },
    { id: 'filter-5',  label: 'Offers',              icon: '🏷️' },
    { id: 'filter-6',  label: 'Delivery Time',       icon: '⏱️' },
    { id: 'filter-7',  label: 'Price Low to High',   icon: '₹' },
    { id: 'filter-8',  label: 'New on Swiggy',       icon: '🆕' }
  ],

  /* ----------------------------------------------------------
   * 4. GROUP MEMBERS
   * Sample members for the AI-powered group ordering demo.
   * Each member has unique dietary preferences, restrictions,
   * and a per-person budget.
   * ---------------------------------------------------------- */
  groupMembers: [
    {
      id: 'gm-1',
      name: 'Rahul',
      avatar: '👨‍💻',
      preferences: 'Loves spicy biryani and kebabs. Prefers non-veg meals with bold flavours. Enjoys trying different regional biryanis.',
      dietaryRestrictions: [],
      budget: 300
    },
    {
      id: 'gm-2',
      name: 'Priya',
      avatar: '👩‍🎨',
      preferences: 'Vegetarian who loves paneer dishes and South Indian food. Prefers Jain-friendly options when available. Enjoys creamy curries.',
      dietaryRestrictions: ['vegetarian', 'no onion', 'no garlic'],
      budget: 250
    },
    {
      id: 'gm-3',
      name: 'Amit',
      avatar: '👨‍🍳',
      preferences: 'Wants pizza or burgers. Big fan of cheese-loaded fast food. Open to trying anything new. Loves combo meals.',
      dietaryRestrictions: [],
      budget: 400
    },
    {
      id: 'gm-4',
      name: 'Sneha',
      avatar: '🧘‍♀️',
      preferences: 'Health-conscious, prefers salads, quinoa bowls and smoothie bowls. Avoids fried food. Likes fresh and light meals.',
      dietaryRestrictions: ['gluten-free'],
      budget: 350
    }
  ],

  /* ----------------------------------------------------------
   * 5. AI RESPONSES
   * Pre-written dialogue strings used by the AI group-ordering
   * assistant at various stages of the ordering flow.
   * ---------------------------------------------------------- */
  aiResponses: {

    /** Shown when a group order session is initiated */
    welcomeMessage: "Hey everyone! 👋 I'm your AI food assistant. I'll help the group find the perfect meal that works for everyone. Let me learn about each person's preferences and I'll suggest the best restaurants and dishes. Let's get started!",

    /** Sequential prompts the AI uses to gather each member's preferences */
    preferencePrompts: [
      "What kind of food are you in the mood for today? 🤔 Any specific cuisine or dish?",
      "Do you have any dietary restrictions I should know about? (veg/non-veg, allergies, etc.)",
      "What's your budget for this meal? 💰",
      "Any dishes you absolutely love or want to avoid? This helps me pick better!",
      "How hungry are you — light snack, regular meal, or a feast? 😄"
    ],

    /** Intro message when AI presents its consensus recommendation */
    consensusIntro: "I've analyzed everyone's preferences and found some great options! 🎯 Here's what I think will make the whole group happy:",

    /** Template for recommending a restaurant (use string interpolation at runtime) */
    restaurantRecommendation: "Based on your group's preferences, I recommend ordering from **{restaurantName}**! 🏆 Here's why:\n\n✅ {reason1}\n✅ {reason2}\n✅ {reason3}\n\n💰 Estimated total: ₹{totalEstimate} (within everyone's budget)\n⏱️ Delivery in {deliveryTime}",

    /** Messages for handling preference conflicts between members */
    conflictResolution: {
      vegNonVeg: "I see we have both veg and non-veg preferences! 🥗🍗 No worries — I'll pick a restaurant with great options for both. Most Indian restaurants have amazing paneer dishes alongside their non-veg specialties.",
      budgetConflict: "There's a bit of a budget spread in the group. 💡 I'll find a restaurant where everyone can order within their budget while still getting a satisfying meal. Here are some smart combinations...",
      cuisineConflict: "Different cuisine preferences — that's totally fine! 🌎 I'll look for restaurants with diverse menus, or we could consider ordering from a place that does fusion really well.",
      spiceLevel: "Mixed spice preferences detected! 🌶️ I'll make sure to suggest mild options alongside the fiery ones so everyone's happy.",
      general: "I noticed some different preferences, but that's what I'm here for! Let me find the perfect middle ground that satisfies everyone. 🤝"
    },

    /** Confirmation message when the group finalises the order */
    orderConfirmation: "Awesome! Your group order is all set! 🎉\n\nHere's the final summary:\n📋 {itemCount} items from {restaurantName}\n💰 Total: ₹{totalAmount}\n⏱️ Estimated delivery: {deliveryTime}\n\nEveryone's preferences have been accommodated. Enjoy your meal together! 🍽️",

    /** Loading/thinking messages shown while AI 'processes' */
    thinking: [
      "Analyzing everyone's preferences... 🧠",
      "Comparing menus across restaurants... 📋",
      "Finding the best value for the group... 💰",
      "Checking dietary compatibility... ✅",
      "Almost there — crafting the perfect recommendation... ✨",
      "Balancing flavours and budgets... ⚖️",
      "Scanning today's best offers for you... 🏷️"
    ]
  },

  /* ----------------------------------------------------------
   * 6. PROMOTIONAL BANNERS
   * Hero carousel banners on the home screen.
   * `bgColor` is a CSS gradient string ready for use.
   * ---------------------------------------------------------- */
  promotionalBanners: [
    {
      id: 'banner-1',
      title: 'AI Group Ordering',
      subtitle: 'Let AI find the perfect meal for your whole group — dietary needs, budgets and all!',
      bgColor: 'linear-gradient(135deg, #FC8019 0%, #FE5200 100%)',
      icon: '🤖'
    },
    {
      id: 'banner-2',
      title: 'Flat 60% OFF',
      subtitle: 'On your first order. Use code WELCOME60. Max discount ₹150.',
      bgColor: 'linear-gradient(135deg, #7B2FF7 0%, #C563F5 100%)',
      icon: '🎉'
    },
    {
      id: 'banner-3',
      title: 'Free Delivery Week',
      subtitle: 'No delivery charges on all orders above ₹199. Limited time offer!',
      bgColor: 'linear-gradient(135deg, #1BA672 0%, #36D399 100%)',
      icon: '🚀'
    },
    {
      id: 'banner-4',
      title: 'Late Night Cravings?',
      subtitle: 'Order till 2 AM from 500+ restaurants near you. Midnight munchies sorted!',
      bgColor: 'linear-gradient(135deg, #2D3436 0%, #636E72 100%)',
      icon: '🌙'
    }
  ]

};
