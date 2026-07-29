<template>
  <div class="page-container">
    <!-- ヘッダー（戻るボタン + タイトル） -->
    <header class="header">
      <button class="back-button" @click="goBack">＜</button>
      <h1 class="title">プロフィール交換</h1>
    </header>

    <!-- メインコンテンツ -->
    <main class="content">
      <!-- 検索バー（虫眼鏡ボタンで検索実行） -->
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="名前またはユーザーIDを入力"
          class="search-input"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">🔍 検索</button>
      </div>

      <!-- 拒否された場合 -->
      <div v-if="hasRejected" class="rejected-message">フォローを拒否しました</div>

      <!-- 1. フォローしている場合：プロフィールカードをフル表示 -->
      <div v-else-if="selectedUser.status === 'following'" class="featured-card">
        <div class="card-header-user">
          <span class="user-display-name">{{ selectedUser.name }} さんのプロフィール</span>
        </div>
        <div class="card-top">
          <div class="avatar-placeholder">
            <svg class="avatar-icon" viewBox="0 0 24 24" fill="#aaa">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
          <!-- 動的プロフィール情報 -->
          <div class="user-info">
            <p class="user-id">ID: {{ selectedUser.userId }}</p>
            <p class="user-bio">{{ selectedUser.bio }}</p>
          </div>
        </div>

        <!-- 動的詳細情報エリア -->
        <div class="card-bottom">
          <div class="detail-item">
            <span class="detail-label">📍 エリア:</span>
            <span class="detail-value">{{ selectedUser.location }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">🎨 趣味:</span>
            <span class="detail-value">{{ selectedUser.hobbies }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">💬 一言:</span>
            <span class="detail-value">{{ selectedUser.comment }}</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-secondary" @click="rejectFeaturedUser">拒否する</button>
          <button class="btn" :class="getUserBtnStatus(selectedUser).class" @click="toggleUserFollow(selectedUser)">
            {{ getUserBtnStatus(selectedUser).text }}
          </button>
        </div>
      </div>

      <!-- 2. 未フォロー・リクエスト中の場合：非公開カードを表示 -->
      <div v-else class="featured-card private-card">
        <div class="card-header-user">
          <span class="user-display-name">{{ selectedUser.name }} さんのプロフィール</span>
        </div>
        <div class="private-content">
          <span class="lock-icon">🔒</span>
          <p class="private-title">このアカウントは非公開です</p>
          <p class="private-sub">フォローすると{{ selectedUser.name }}さんのプロフィールや詳細を閲覧できます</p>
        </div>
        <div class="card-actions single-action">
          <button class="btn" :class="getUserBtnStatus(selectedUser).class" @click="toggleUserFollow(selectedUser)">
            {{ getUserBtnStatus(selectedUser).text }}
          </button>
        </div>
      </div>

      <!-- タブ切り替え（フォロワー / フォロー中 / リクエスト） -->
      <div class="tab-container">
        <button class="tab-button" :class="{ active: activeTab === 'followers' }" @click="activeTab = 'followers'">
          フォロワー ({{ followersList.length }})
        </button>
        <button class="tab-button" :class="{ active: activeTab === 'following' }" @click="activeTab = 'following'">
          フォロー中 ({{ followingList.length }})
        </button>
        <button class="tab-button" :class="{ active: activeTab === 'requests' }" @click="activeTab = 'requests'">
          リクエスト
          <span v-if="requestsList.length > 0" class="badge">{{ requestsList.length }}</span>
        </button>
      </div>

      <!-- ユーザーリスト表示エリア -->
      <div class="user-list">
        <!-- 1. フォロワーリスト -->
        <template v-if="activeTab === 'followers'">
          <div v-if="followersList.length === 0" class="empty-state">該当するフォロワーはいません</div>
          <div
            v-for="user in followersList"
            :key="user.id"
            class="user-item"
            :class="{ selected: selectedUser.id === user.id }"
            @click="selectUser(user)"
          >
            <span class="user-name">{{ user.name }}</span>
            <button class="btn btn-sm" :class="getUserBtnStatus(user).class" @click.stop="toggleUserFollow(user)">
              {{ getUserBtnStatus(user).text }}
            </button>
          </div>
        </template>

        <!-- 2. フォロー中リスト -->
        <template v-else-if="activeTab === 'following'">
          <div v-if="followingList.length === 0" class="empty-state">該当するフォロー中のユーザーはいません</div>
          <div
            v-for="user in followingList"
            :key="user.id"
            class="user-item"
            :class="{ selected: selectedUser.id === user.id }"
            @click="selectUser(user)"
          >
            <span class="user-name">{{ user.name }}</span>
            <button class="btn btn-sm" :class="getUserBtnStatus(user).class" @click.stop="toggleUserFollow(user)">
              {{ getUserBtnStatus(user).text }}
            </button>
          </div>
        </template>

        <!-- 3. フォローリクエスト欄 -->
        <template v-else-if="activeTab === 'requests'">
          <div v-if="requestsList.length === 0" class="empty-state">新しいリクエストはありません</div>
          <div v-for="user in requestsList" :key="user.id" class="user-item" @click="selectUser(user)">
            <span class="user-name">{{ user.name }}</span>
            <div class="request-actions">
              <button class="btn btn-sm btn-accept" @click.stop="acceptRequest(user)">承認</button>
              <button class="btn btn-sm btn-secondary" @click.stop="rejectRequest(user)">削除</button>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");
const appliedSearchQuery = ref(""); // 検索実行された文字を保持
const activeTab = ref("followers");
const hasRejected = ref(false);

// ユーザーデータ一覧（フォロー中ユーザーを追加）
const users = ref([
  {
    id: 1,
    name: "佐藤 さくら",
    userId: "@sakura_sato",
    status: "none",
    isFollower: true,
    isRequesting: false,
    bio: "イラストを描くのが好きです🎨 まったり投稿中！",
    location: "東京都",
    hobbies: "イラスト、読書、カフェ巡り",
    comment: "フォロワーさん歓迎です！"
  },
  {
    id: 2,
    name: "田中 健太",
    userId: "@kenta_tanaka",
    status: "requested",
    isFollower: true,
    isRequesting: false,
    bio: "フットサルとラーメン巡りが趣味。週末はだいたい外にいます⚽️",
    location: "神奈川県",
    hobbies: "フットサル、ドライブ、ラーメン開拓",
    comment: "気軽に仲良くしてくださいー！"
  },
  {
    id: 3,
    name: "鈴木 葵",
    userId: "@aoi_suzuki",
    status: "following",
    isFollower: true,
    isRequesting: false,
    bio: "カフェ巡りと写真撮影が大好き📷☕️ 美味しいスイーツを探す旅に出ています。",
    location: "大阪府",
    hobbies: "カフェ巡り、写真撮影、旅行",
    comment: "カフェ好きの人と繋がりたいです✨"
  },
  {
    id: 6, // ✨ 追加されたフォロー中ユーザー
    name: "中村 拓海",
    userId: "@takumi_n",
    status: "following",
    isFollower: true,
    isRequesting: false,
    bio: "Webエンジニアです💻 プログラミングとガジェット収集が趣味です。",
    location: "千葉県",
    hobbies: "プログラミング、ガジェット、キャンプ",
    comment: "IT系のアカウント中心にフォローしてます！"
  },
  {
    id: 4,
    name: "高橋 陸",
    userId: "@riku_takahashi",
    status: "none",
    isFollower: false,
    isRequesting: true,
    bio: "バンドでベース弾いてます🎸 音楽好きな人は気軽にフォローしてください！",
    location: "愛知県",
    hobbies: "ベース演奏、ライブ鑑賞、映画",
    comment: "リクエストお気軽にどうぞ👍"
  },
  {
    id: 5,
    name: "美咲",
    userId: "@misaki_style",
    status: "none",
    isFollower: false,
    isRequesting: true,
    bio: "コスメと洋服が大好き💄 日常の気になったことや購入品をアップしてます！",
    location: "福岡県",
    hobbies: "メイク、ファッション、ヨガ",
    comment: "情報交換しましょう〜"
  }
]);

// 上部のカードに表示する選択中のユーザー（初期値：鈴木 葵さん）
const selectedUser = ref(users.value[2]);

// 🔍 虫眼鏡ボタンを押したときに検索フィルタを実行
const handleSearch = () => {
  appliedSearchQuery.value = searchQuery.value.trim();

  // 検索結果の1番目を自動的に選択して上部カードにセット
  if (filteredUsers.value.length > 0) {
    selectedUser.value = filteredUsers.value[0];
    hasRejected.value = false;
  }
};

// 検索ボタン実行後のキーワードで絞り込み
const filteredUsers = computed(() => {
  if (!appliedSearchQuery.value) {
    return users.value;
  }
  const query = appliedSearchQuery.value.toLowerCase();
  return users.value.filter((u) => u.name.toLowerCase().includes(query) || u.userId.toLowerCase().includes(query));
});

// 各タブの絞り込み
const followersList = computed(() => filteredUsers.value.filter((u) => u.isFollower));
const followingList = computed(() => filteredUsers.value.filter((u) => u.status === "following"));
const requestsList = computed(() => filteredUsers.value.filter((u) => u.isRequesting));

const goBack = () => {
  router.push("/home");
};

const selectUser = (user) => {
  selectedUser.value = user;
  hasRejected.value = false;
};

const rejectFeaturedUser = () => {
  hasRejected.value = true;
};

const toggleUserFollow = (user) => {
  if (user.status === "none") {
    user.status = "requested";
  } else if (user.status === "requested") {
    user.status = "none";
  } else if (user.status === "following") {
    user.status = "none";
  }
};

const acceptRequest = (user) => {
  user.isRequesting = false;
  user.isFollower = true;
};

const rejectRequest = (user) => {
  user.isRequesting = false;
};

const getUserBtnStatus = (user) => {
  if (user.status === "requested") {
    return { text: "リクエスト中", class: "btn-requested" };
  } else if (user.status === "following") {
    return { text: "フォロー中", class: "btn-following" };
  }
  return { text: "フォロー", class: "btn-primary" };
};
</script>

<style scoped>
/* 全体レイアウト */
.page-container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffeef2;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}

/* ヘッダー */
.header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fdd8e5;
}

.back-button {
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #4a3334;
  cursor: pointer;
}

.title {
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #4a3334;
  margin: 0;
  margin-right: 20px;
}

/* メインコンテンツ */
.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
}

/* 検索バー */
.search-bar {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 4px 6px 4px 16px;
  gap: 8px;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 13px;
  background: transparent;
}

.search-btn {
  background-color: #f4a261;
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #e76f51;
}

/* メインカード */
.featured-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-header-user {
  margin-bottom: 12px;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}

.user-display-name {
  font-size: 15px;
  font-weight: bold;
  color: #4a3334;
}

.card-top {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: flex-start;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.avatar-icon {
  width: 50px;
  height: 50px;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-id {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.user-bio {
  font-size: 13px;
  color: #444;
  line-height: 1.4;
  margin: 4px 0 0 0;
}

.card-bottom {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  background-color: #fafafa;
  padding: 12px;
  border-radius: 12px;
}

.detail-item {
  display: flex;
  font-size: 12px;
  gap: 8px;
}

.detail-label {
  color: #666;
  font-weight: bold;
  width: 70px;
}

.detail-value {
  color: #333;
  flex: 1;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.card-actions.single-action {
  justify-content: center;
}

/* 非公開カード */
.private-card {
  text-align: center;
  padding: 20px 20px 30px 20px;
}

.private-content {
  margin: 16px 0 20px 0;
}

.lock-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}

.private-title {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin: 0 0 6px 0;
}

.private-sub {
  font-size: 12px;
  color: #777;
  margin: 0;
}

/* 拒否メッセージ */
.rejected-message {
  background-color: #fff0f3;
  color: #d9534f;
  border: 1px solid #f5c6cb;
  padding: 14px;
  border-radius: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}

/* タブ切替 */
.tab-container {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-top: 8px;
}

.tab-button {
  flex: 1;
  padding: 10px 0;
  background: none;
  border: none;
  font-size: 13px;
  font-weight: bold;
  color: #888;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.tab-button.active {
  color: #4a3334;
  border-bottom-color: #4a3334;
}

.badge {
  background-color: #e53935;
  color: #ffffff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 4px;
}

/* ボタン各種 */
.btn {
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-sm {
  padding: 4px 12px;
  font-size: 11px;
}

.btn-primary {
  background-color: #f7e1b5;
  color: #4a3334;
  border: 1px solid #4a3334;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ccc;
}

.btn-requested {
  background-color: #e0e0e0;
  color: #555;
  border: 1px solid #bbb;
}

.btn-following {
  background-color: #ffffff;
  color: #333;
  border: 1px solid #ccc;
}

.btn-accept {
  background-color: #4cae4c;
  color: white;
  border: none;
}

/* リスト領域 */
.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.user-item.selected {
  border-color: #f4a261;
}

.user-name {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.request-actions {
  display: flex;
  gap: 8px;
}

.empty-state {
  text-align: center;
  color: #888;
  font-size: 13px;
  padding: 20px 0;
}
</style>
