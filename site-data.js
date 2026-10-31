const siteData = {
    categories: {
        "about": { name: "about", url: "/about/" },
        "雑記": { name: "雑記", url: "/essay/note/" },
        "散歩日記": { name: "散歩日記", url: "/essay/sampo/" },
       "短歌作品": { name: "短歌作品", url: "/work/tanka/" },
        "一首評": { name: "一首評", url: "/review/isshu/" },
        "評・感想": { name: "評・感想", url: "/review/comment/" },
    },

    // お知らせ・固定表示データ
    news: [
        {
            date: "2026-10-2",
            title: "サイトを公開しました",
            url: "/essay/note/261002_publish.html",
            isFixed: true
        },
    ],
    // 全記事データ（新しい記事が上）
    articles: [

        // {
        //     date: "2026-10-**",
        //     title: "パフェ歌会",
        //     url: "/essay/note/2610**_stir.html",
        //     category: "note",
        //     tags: ["歌会", "短歌作品"]
        // },
        // {
        //     date: "2026-10-**",
        //     title: "第三回大学短歌トーナメントin関西雑感",
        //     url: "/essay/note/2610**_tournament.html",
        //     category: "note",
        //     tags: ["短歌作品"]
        // },
        // {
        //     date: "2026-11-**",
        //     title: "10月の記録",
        //     url: "/essay/note/2611**_record26Oct.html",
        //     category: "雑記",
        //     tags: ["雑記", "record"]
        // },
        {
            date: "2026-10-31",
            title: "つぶやかなかったこと",
            url: "/essay/note/261031_untweeted26Oct.html",
            category: "雑記",
            tags: ["雑記", "untweeted"]
        },
        {
            date: "2026-10-31",
            title: "城跡にて（7首）",
            url: "/work/tanka/261031_shiroatonite.html",
            category: "短歌",
            tags: ["短歌作品"]
        },
        {
            date: "2026-10-10",
            title: "長めの散歩",
            url: "/essay/sampo/smp0005.html",
            category: "散歩日記",
            tags: ["散歩日記"]
        },
        {
            date: "2026-10-10",
            title: "ある日の散歩（日没とともに）",
            url: "/essay/sampo/smp0004.html",
            category: "散歩日記",
            tags: ["散歩日記"]
        },
        {
            date: "2026-10-10",
            title: "大学からの帰りと寄り道",
            url: "/essay/sampo/smp0003.html",
            category: "散歩日記",
            tags: ["散歩日記"]
        },
        {
            date: "2026-10-10",
            title: "5月最後のごく短い散歩",
            url: "/essay/sampo/smp0002.html",
            category: "散歩日記",
            tags: ["散歩日記"]
        },
        {
            date: "2026-10-10",
            title: "雨の日の散歩（梅田へ）",
            url: "/essay/sampo/smp0001.html",
            category: "散歩日記",
            tags: ["散歩日記"]
        },
        {
            date: "2026-10-02",
            title: "短歌生活一年",
            url: "/essay/note/261002_1year.html",
            category: "雑記",
            tags: ["雑記"]
        },
        {
            date: "2026-10-02",
            title: "沈黙（16首）",
            url: "/work/tanka/261002_chimmoku.html",
            category: "短歌",
            tags: ["短歌作品"]
        },
        {
            date: "2026-10-02",
            title: "サイトを公開しました",
            url: "/essay/note/261002_publish.html",
            category: "雑記",
            tags: ["雑記"]
        },
        {
            date: "2026-10-02",
            title: "プロフィール",
            url: "about.html",
            category: "about",
            tags: ["自己紹介"]
        },

    ]
};