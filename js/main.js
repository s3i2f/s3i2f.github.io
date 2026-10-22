//////////////////////////////
//【ページネーション生成機能】
//////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    try {
        // 1. ページ内に表示先コンテナが存在するか確認（トップページなどではここで処理終了）
        const container = document.getElementById("pagination-container");
        if (!container) return;

        // 2. site-data.js が正しく読み込まれているか、articles配列が存在するか確認
        if (typeof siteData === 'undefined' || !siteData.articles) {
            console.warn("ページネーション: siteData または siteData.articles が読み込まれていません。");
            return;
        }

        const currentPath = window.location.pathname;

        // 3. siteData.articles の中から現在の記事を取得
        const currentArticle = siteData.articles.find(article => currentPath.includes(article.url));
        if (!currentArticle) return; // site-data.jsに未登録の記事ページなら処理終了

        // 4. 同じカテゴリの記事だけを抽出
        const categoryData = siteData.articles.filter(article => article.category === currentArticle.category);

        // 5. 絞り込んだカテゴリ配列の中での現在記事のインデックスを取得
        const currentIndex = categoryData.findIndex(article => article.url === currentArticle.url);
        if (currentIndex === -1) return;

        // 6. 同カテゴリ内での前後の記事を取得（配列の上が最新）
        const newerArticle = currentIndex > 0 ? categoryData[currentIndex - 1] : null;
        const olderArticle = currentIndex < categoryData.length - 1 ? categoryData[currentIndex + 1] : null;

        // 7. HTMLを生成して挿入
        let html = '';

        // 前の記事（古い記事）へのリンク
        if (olderArticle) {
            html += `<a href="${olderArticle.url}" class="page-prev">&larr; 前へ: ${olderArticle.title}</a>`;
        } else {
            html += `<span class="page-prev empty"></span>`;
        }

        // 次の記事（新しい記事）へのリンク
        if (newerArticle) {
            html += `<a href="${newerArticle.url}" class="page-next">次へ: ${newerArticle.title} &rarr;</a>`;
        } else {
            html += `<span class="page-next empty"></span>`;
        }

        container.innerHTML = html;

    } catch (error) {
        // 万が一予期せぬエラーが起きても、ここでエラーを吸収し、他の処理（目次生成など）を止めない
        console.error("ページネーションの生成中にエラーが発生しました:", error);
    }
});



///////////////////////////////
// 【パンくずリスト生成機能】
///////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    try {
        // 1. ページ内に表示先コンテナが存在するか確認（トップページなどではここで処理終了）
        const breadcrumbs = document.getElementById('breadcrumbs');
        if (!breadcrumbs) return;

        // 2. URLのパスから配列を生成
        const pathArray = window.location.pathname.split('/').filter(p => p !== "" && p !== "index.html");

        let html = '<a href="/">ホーム</a>';
        let currentPath = '';

        // 3. パス名と表示名のマッピング
        const nameMap = {
            "essay": "Essay",
            "note": "雑記",
            "sampo": "散歩日記",
            "review": "Review",
            "work": "Work",
            "tanka": "短歌"
        };

        // 4. ページタイトルを取得
        const pageTitle = document.title.split('|')[0].trim();

        // 5. HTML文字列を生成
        pathArray.forEach((path, index) => {
            currentPath += `/${path}`;
            const displayName = nameMap[path] || path;

            html += ' > ';
            if (index === pathArray.length - 1) {
                // 現在のページ（リンクにしない）
                html += `<span>${pageTitle}</span>`;
            } else {
                // 途中のディレクトリ
                html += `<a href="${currentPath}/">${displayName}</a>`;
            }
        });

        // 6. 生成したHTMLを挿入
        breadcrumbs.innerHTML = html;

    } catch (error) {
        // エラーが発生しても他のスクリプト（ページネーションなど）を止めない
        console.error("パンくずリストの生成中にエラーが発生しました:", error);
    }
});