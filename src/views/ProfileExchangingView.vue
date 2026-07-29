<template>
  <div class="page-container">
    <!-- ヘッダー -->
    <header class="header">
      <!-- ＜ 押したらトップページに飛ぶボタン -->
      <button class="back-btn" @click="goToTop">＜</button>
      <h1 class="title">プロフィール交換</h1>
    </header>

    <!-- メインコンテンツ -->
    <main class="content">
      <!-- 検索バー -->
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="名前またはユーザーIDを入力"
          class="search-input"
        />
        <button class="search-btn">🔍 検索</button>
      </div>

      <!-- プロフィール表示エリア -->
      <!-- Case 1: 「フォロー中」のユーザーを選択している場合 ➔ 詳細を表示 -->
      <div v-if="selectedUser.status === 'following'" class="profile-card">
        <div class="card-title-header">
          <span class="user-display-name"
            >{{ selectedUser.name }} さんのプロフィール</span
          >
        </div>

        <div class="profile-detail-top">
          <div class="avatar-circle">
            <svg class="avatar-icon" viewBox="0 0 24 24" fill="#bbb">
              <path
                d="M12,12 C14.21,12 16,10.21 16,8 C16,5.79 14.21,4 12,4 C9.79,4 8,5.79 8,8 C8,10.21 9.79,12 12,12 Z M12,14 C9.33,14 4,15.34 4,18 L4,20 L20,20 L20,18 C20,15.34 14.67,14 12,14 Z"
              />
            </svg>
          </div>
          <div class="profile-bio">
            <div class="user-id">ID: @{{ selectedUser.idName }}</div>
            <p class="bio-text">{{ selectedUser.bio }}</p>
          </div>
        </div>

        <div class="profile-detail-info">
          <div class="info-row">
            <span class="icon">📍</span> <span class="label">エリア:</span>
            {{ selectedUser.area }}
          </div>
          <div class="info-row">
            <span class="icon">📍</span> <span class="label">趣味:</span>
            {{ selectedUser.hobby }}
          </div>
          <div class="info-row">
            <span class="icon">💬</span> <span class="label">一言:</span>
            {{ selectedUser.comment }}
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-reject" @click="rejectSelectedUser">
            拒否する
          </button>
          <button
            class="btn btn-following-state"
            @click="toggleFollow(selectedUser)"
          >
            フォロー中
          </button>
        </div>
      </div>

      <!-- Case 2: 「フォロー中」以外（未フォロー/リクエスト中）を選択している場合 ➔ 非公開表示 -->
      <div v-else class="profile-card private-card">
        <div class="card-title-header center">
          <span class="user-display-name"
            >{{ selectedUser.name }} さんのプロフィール</span
          >
        </div>

        <div class="private-content">
          <div class="lock-icon">🔒</div>
          <div class="private-title">このアカウントは非公開です</div>
          <div class="private-sub">
            フォローすると{{
              selectedUser.name
            }}さんのプロフィール詳細を閲覧できます
          </div>
        </div>

        <div class="card-actions center-action">
          <button
            class="btn"
            :class="getButtonClass(selectedUser)"
            @click="toggleFollow(selectedUser)"
          >
            {{ getButtonText(selectedUser) }}
          </button>
        </div>
      </div>

      <!-- タブ切替 -->
      <div class="tab-container">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'followers' }"
          @click="activeTab = 'followers'"
        >
          フォロワー ({{ followersList.length }})
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'following' }"
          @click="activeTab = 'following'"
        >
          フォロー中 ({{ followingList.length }})
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'requests' }"
          @click="activeTab = 'requests'"
        >
          リクエスト
          <span v-if="requestsList.length > 0" class="badge">{{
            requestsList.length
          }}</span>
        </button>
      </div>

      <!-- ユーザーリスト -->
      <div class="user-list">
        <!-- フォロワー タブ -->
        <template v-if="activeTab === 'followers'">
          <div
            v-for="user in followersList"
            :key="user.id"
            class="user-item"
            :class="{ active: selectedUser.id === user.id }"
            @click="selectedUser = user"
          >
            <span class="user-name">{{ user.name }}</span>
            <button
              class="btn btn-sm"
              :class="getButtonClass(user)"
              @click.stop="toggleFollow(user)"
            >
              {{ getButtonText(user) }}
            </button>
          </div>
        </template>

        <!-- フォロー中 タブ -->
        <template v-else-if="activeTab === 'following'">
          <div
            v-for="user in followingList"
            :key="user.id"
            class="user-item"
            :class="{ active: selectedUser.id === user.id }"
            @click="selectedUser = user"
          >
            <span class="user-name">{{ user.name }}</span>
            <button
              class="btn btn-sm btn-following-state"
              @click.stop="toggleFollow(user)"
            >
              フォロー中
            </button>
          </div>
        </template>

        <!-- リクエスト タブ -->
        <template v-else-if="activeTab === 'requests'">
          <div v-if="requestsList.length === 0" class="empty-msg">
            リクエストはありません
          </div>
          <div
            v-for="user in requestsList"
            :key="user.id"
            class="user-item"
            @click="selectedUser = user"
          >
            <span class="user-name">{{ user.name }}</span>
            <div class="request-btns">
              <button
                class="btn btn-sm btn-accept"
                @click.stop="acceptRequest(user)"
              >
                承認
              </button>
              <button
                class="btn btn-sm btn-delete"
                @click.stop="rejectRequest(user)"
              >
                拒否
              </button>
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
const activeTab = ref("followers");

// トップページへ遷移する処理
const goToTop = () => {
  router.push("/top");
};

// 初期ユーザーデータ
const users = ref([
  {
    id: 1,
    name: "鈴木 葵",
    idName: "aoi_suzuki",
    status: "following",
    isFollower: true,
    isRequesting: false,
    bio: "カフェ巡りと写真撮影が大好き📷✨ 美味しいスイーツを探す旅に出ています。",
    area: "大阪府",
    hobby: "カフェ巡り、写真撮影、旅行",
    comment: "カフェ好きの人と繋がりたいです✨",
  },
  {
    id: 2,
    name: "佐藤 さくら",
    idName: "sakura_s",
    status: "none",
    isFollower: true,
    isRequesting: false,
    bio: "音楽鑑賞とライブに行くのが休日の楽しみです🎶",
    area: "東京都",
    hobby: "ライブ鑑賞、邦ロック",
    comment: "気軽に話しかけてください！",
  },
  {
    id: 3,
    name: "田中 健太",
    idName: "kenta_t",
    status: "requested",
    isFollower: true,
    isRequesting: false,
    bio: "週末はドライブによく出かけています🚗💨",
    area: "神奈川県",
    hobby: "ドライブ、スノーボード",
    comment: "アクティブな友達募集中です！",
  },
  {
    id: 4,
    name: "中村 拓海",
    idName: "takumi_n",
    status: "following",
    isFollower: true,
    isRequesting: false,
    bio: "Web開発とイラストを描くのが趣味です💻🎨 最近はキャンプにもハマり中⛺️",
    area: "兵庫県",
    hobby: "プログラミング、イラスト、アウトドア",
    comment: "ガジェットとアウトドア好きの方ぜひ繋がりましょう！",
  },
  {
    id: 5,
    name: "高橋 涼",
    idName: "ryo_t",
    status: "none",
    isFollower: false,
    isRequesting: true,
    bio: "読書と映画鑑賞が趣味です📚🎬",
    area: "京都府",
    hobby: "映画観賞、読書",
    comment: "おすすめの映画教えてください！",
  },
  {
    id: 6,
    name: "伊藤 美咲",
    idName: "misaki_i",
    status: "none",
    isFollower: false,
    isRequesting: true,
    bio: "美味しいものを食べることが一番の幸せ🍴❤️",
    area: "愛知県",
    hobby: "グルメ巡り、料理",
    comment: "美味しいお店情報交換しましょう！",
  },
]);

// 初期表示で「鈴木 葵」を選択
const selectedUser = ref(users.value[0]);

// 検索フィルター
const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) return users.value;
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(query) ||
      u.idName.toLowerCase().includes(query),
  );
});

// タブごとのリスト
const followersList = computed(() =>
  filteredUsers.value.filter((u) => u.isFollower),
);
const followingList = computed(() =>
  filteredUsers.value.filter((u) => u.status === "following"),
);
const requestsList = computed(() =>
  filteredUsers.value.filter((u) => u.isRequesting),
);

// ボタンのテキストとスタイル切り替え
const getButtonText = (user) => {
  if (user.status === "requested") return "リクエスト中";
  if (user.status === "following") return "フォロー中";
  return "フォロー";
};

const getButtonClass = (user) => {
  if (user.status === "requested") return "btn-requested-state";
  if (user.status === "following") return "btn-following-state";
  return "btn-follow-action";
};

// フォロー / リクエスト切替ロジック
const toggleFollow = (user) => {
  if (user.status === "none") {
    user.status = "requested";
  } else if (user.status === "requested") {
    user.status = "none";
  } else if (user.status === "following") {
    user.status = "none";
  }
};

// リクエストタブの「承認」
const acceptRequest = (user) => {
  user.isRequesting = false;
  user.isFollower = true;
};

// リクエストタブの「拒否」
const rejectRequest = (user) => {
  user.isRequesting = false;
};

// プロフィールカード内の「拒否する」
const rejectSelectedUser = () => {
  selectedUser.value.status = "none";
};
</script>

<style scoped>
.page-container {
  width: 100%;
  min-height: 100vh;
  background-color: #fce8ee;
  font-family: sans-serif;
  box-sizing: border-box;
}

.header {
  position: relative;
  background-color: #f7cbd6;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

.back-btn {
  position: absolute;
  left: 12px;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  padding: 0 8px;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 800px; /* PC画面で広がりすぎないよう中央寄算見栄え用のカード制限（不要なら削除可） */
  margin: 0 auto;
}

/* 検索バー */
.search-bar {
  display: flex;
  background: #ffffff;
  border-radius: 20px;
  padding: 3px 3px 3px 12px;
  align-items: center;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 12px;
}

.search-btn {
  background-color: #f3a660;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 5px 12px;
  font-size: 11px;
  cursor: pointer;
}

/* プロフィールカード */
.profile-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.card-title-header {
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.profile-detail-top {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar-circle {
  width: 50px;
  height: 50px;
  background-color: #e2e2e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-icon {
  width: 32px;
  height: 32px;
}

.user-id {
  font-size: 10px;
  color: #888;
}

.bio-text {
  font-size: 11px;
  color: #444;
  margin: 4px 0 0 0;
  line-height: 1.4;
}

.profile-detail-info {
  background-color: #fafafa;
  border-radius: 8px;
  padding: 10px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.info-row .label {
  font-weight: bold;
  color: #555;
}

/* カード内アクションボタン */
.card-actions {
  display: flex;
  justify-content: space-between;
}

.center-action {
  justify-content: center;
}

.btn {
  border-radius: 14px;
  font-size: 11px;
  font-weight: bold;
  padding: 5px 16px;
  cursor: pointer;
  border: none;
}

.btn-sm {
  padding: 4px 12px;
  font-size: 10px;
}

.btn-reject {
  background: #f0f0f0;
  color: #666;
}

.btn-follow-action {
  background: #fce8cc;
  color: #333;
  border: 1px solid #e2b378;
}

.btn-requested-state {
  background: #dcdcdc;
  color: #666;
}

.btn-following-state {
  background: #ffffff;
  color: #333;
  border: 1px solid #ccc;
}

.btn-accept {
  background: #52c41a;
  color: white;
}

.btn-delete {
  background: #e6e6e6;
  color: #666;
}

/* 非公開カード表示 */
.private-card {
  text-align: center;
  padding: 24px 16px;
}

.private-content {
  margin: 16px 0;
}

.lock-icon {
  font-size: 24px;
  margin-bottom: 6px;
}

.private-title {
  font-size: 13px;
  font-weight: bold;
  color: #333;
}

.private-sub {
  font-size: 10px;
  color: #888;
  margin-top: 4px;
}

/* タブ切替 */
.tab-container {
  display: flex;
  border-bottom: 2px solid #e8b0bd;
  margin-top: 6px;
}

.tab-button {
  flex: 1;
  background: none;
  border: none;
  padding: 8px 0;
  font-size: 12px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

.tab-button.active {
  color: #333;
  border-bottom-color: #333;
}

.badge {
  background: #d9363e;
  color: white;
  border-radius: 10px;
  padding: 1px 5px;
  font-size: 9px;
  margin-left: 2px;
}

/* リストアイテム */
.user-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-item {
  background: #ffffff;
  border-radius: 16px;
  padding: 8px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.user-item.active {
  outline: 2px solid #f3a660;
}

.user-name {
  font-size: 12px;
  font-weight: bold;
  color: #333;
}

.request-btns {
  display: flex;
  gap: 6px;
}

.empty-msg {
  text-align: center;
  font-size: 11px;
  color: #888;
  padding: 12px;
}
</style>
