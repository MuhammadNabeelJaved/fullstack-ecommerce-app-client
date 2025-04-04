const products = [
    {
        id: 1,
        name: "Premium Headphones",
        price: 299,
        rating: 4.8,
        reviews: 124,
        description:
            "Experience crystal-clear sound with our premium noise-cancelling headphones. Perfect for music lovers and professionals alike, featuring 40-hour battery life and ultra-comfortable ear cushions.",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D"
        ],
        offer: "20% off for a limited time",
        bgColor: "from-black/80 to-transparent",
        tag: "Special Discount",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199,
        rating: 4.6,
        reviews: 89,
        description:
            "Track your fitness goals, receive notifications, and monitor your health with our advanced smartwatch. Water-resistant design with a vibrant OLED display and 7-day battery life.",
        image:
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1544117519-cc0d19974c1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D"
        ],
        offer: "Free fitness tracking app with purchase",
        bgColor: "from-black/80 to-transparent",
        tag: "New Arrival",
    },
    {
        id: 3,
        name: "Wireless Speaker",
        price: 149,
        rating: 4.5,
        reviews: 76,
        description:
            "Fill any room with immersive 360° sound. This portable Bluetooth speaker delivers rich bass and clear highs with 20 hours of playback. Waterproof design makes it perfect for outdoor adventures.",
        image:
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1610465299993-e6675c9f9efa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D"
        ],
        offer: "Buy one get 25% off a second speaker",
        bgColor: "from-black/80 to-transparent",
        tag: "Limited Time",
    },
    {
        id: 4,
        name: "Gaming Mouse",
        price: 79,
        rating: 4.7,
        reviews: 112,
        description:
            "Dominate your games with precision and speed. This ergonomic gaming mouse features customizable RGB lighting, 16,000 DPI optical sensor, and 8 programmable buttons for the ultimate gaming experience.",
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
        images: [
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1586349906319-48d20e9d17e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbWluZyUyMG1vdXNlfGVufDB8fDB8fHww"
        ],
        offer: "Free gaming mousepad with purchase",
        bgColor: "from-black/80 to-transparent",
        tag: "Best Seller",
    },
    {
        id: 5,
        name: "Mechanical Keyboard",
        price: 129,
        rating: 4.9,
        reviews: 156,
        description:
            "Enhance your typing experience with our premium mechanical keyboard. Features tactile switches, customizable RGB backlighting, and a durable aluminum frame for long-lasting performance.",
        image:
            "https://images.unsplash.com/photo-1595044426077-d36d9236d44e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1595044426077-d36d9236d44e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1631094248424-a8d8c6b95ad3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lY2hhbmljYWwlMjBrZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D"
        ],
        offer: "10% off with code MECH10",
        bgColor: "from-black/80 to-transparent",
        tag: "Top Rated",
    },
    {
        id: 6,
        name: "Wireless Earbuds",
        price: 129,
        rating: 4.7,
        reviews: 203,
        description:
            "Immerse yourself in premium sound with our wireless earbuds. Featuring active noise cancellation, 24-hour battery life with the charging case, and sweat-resistant design for workouts.",
        image:
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1631867675167-90a456a90863?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D"
        ],
        offer: "Free charging pad with purchase",
        bgColor: "from-black/80 to-transparent",
        tag: "Best Seller",
    },
    {
        id: 7,
        name: "4K Action Camera",
        price: 249,
        rating: 4.6,
        reviews: 87,
        description:
            "Capture your adventures in stunning 4K resolution with our waterproof action camera. Features image stabilization, slow-motion recording, and Wi-Fi connectivity for instant sharing.",
        image:
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWN0aW9uJTIwY2FtZXJhfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWN0aW9uJTIwY2FtZXJhfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1525385444278-b7968b2b38f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWN0aW9uJTIwY2FtZXJhfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFjdGlvbiUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFjdGlvbiUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D"
        ],
        offer: "Free 64GB memory card",
        bgColor: "from-black/80 to-transparent",
        tag: "New Arrival",
    },
    {
        id: 8,
        name: "Smart Home Hub",
        price: 179,
        rating: 4.5,
        reviews: 94,
        description:
            "Control your entire smart home with our intuitive hub. Compatible with over 1,000 smart devices, featuring voice control, automation routines, and enhanced security protocols.",
        image:
            "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBob21lfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBob21lfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtYXJ0JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNtYXJ0JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D"
        ],
        offer: "Free smart bulb included",
        bgColor: "from-black/80 to-transparent",
        tag: "Smart Home",
    },
    {
        id: 9,
        name: "Fitness Tracker",
        price: 89,
        rating: 4.4,
        reviews: 132,
        description:
            "Monitor your health and fitness goals with our advanced tracker. Tracks steps, heart rate, sleep quality, and workout performance with a 7-day battery life and water-resistant design.",
        image:
            "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
        images: [
            "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZpdG5lc3MlMjB0cmFja2VyfGVufDB8fDB8fHww"
        ],
        offer: "3-month premium subscription included",
        bgColor: "from-black/80 to-transparent",
        tag: "Fitness",
    },
    {
        id: 10,
        name: "Portable Power Bank",
        price: 49,
        rating: 4.7,
        reviews: 215,
        description:
            "Never run out of battery with our high-capacity 20,000mAh power bank. Features fast charging technology, dual USB ports, and USB-C compatibility in a slim, portable design.",
        image:
            "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1618438051743-025208ff0a3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1585338069738-65b9e65db9b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww"
        ],
        offer: "Buy 2 for $80",
        bgColor: "from-black/80 to-transparent",
        tag: "Best Seller",
    },
    {
        id: 11,
        name: "Noise-Cancelling Earphones",
        price: 159,
        rating: 4.8,
        reviews: 178,
        description:
            "Experience uninterrupted audio with our premium noise-cancelling earphones. Featuring 30-hour battery life, customizable EQ settings, and comfortable fit for all-day wear.",
        image:
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFycGhvbmVzfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFycGhvbmVzfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcnBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWFycGhvbmVzfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVhcnBob25lc3xlbnwwfHwwfHx8MA%3D%3D"
        ],
        offer: "Free carrying case included",
        bgColor: "from-black/80 to-transparent",
        tag: "Premium Audio"
    }
];

export default products;
