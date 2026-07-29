<template>
  <div class="page-container">
    <!-- ヘッダー -->
    <header class="header">
      <button class="back-btn" @click="goToTop">＜</button>
      <h1 class="title">📖 プロフィール交換 🎀</h1>
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

      <!-- ==================================================== -->
      <!-- Case 1: 「フォロー中」の場合 ➔ リアルな手帳の紙風プロフ帳表示 -->
      <!-- ==================================================== -->
      <div
        v-if="selectedUser.status === 'following'"
        class="profile-notebook-paper"
      >
        <!-- バインダーのリング穴装飾 -->
        <div class="paper-binder-holes">
          <span v-for="i in 8" :key="i" class="hole"></span>
        </div>

        <!-- マスキングテープ風装飾（右上） -->
        <div class="masking-tape"></div>

        <!-- 日付 & ヘッダータイトル -->
        <div class="paper-header">
          <span class="paper-badge">★ PROFILE BOOK ★</span>
          <span class="paper-date"
            >DATE: {{ selectedUser.profileData.date || "2026.07.29" }}</span
          >
        </div>

        <!-- メイン基本情報エリア -->
        <div class="paper-section basic-info-section">
          <div class="avatar-area">
            <div class="avatar-box">
              {{ selectedUser.profileData.avatar || "💖" }}
            </div>
            <span class="user-id-tag">@{{ selectedUser.idName }}</span>
          </div>

          <div class="name-details">
            <div class="name-row">
              <span class="label-sub">なまえ</span>
              <h2 class="user-name-text">{{ selectedUser.name }}</h2>
            </div>

            <!-- ドット線で仕切られた基本情報グリッド -->
            <div class="grid-details">
              <div class="detail-item">
                <span class="lbl">たんじょうび:</span>
                {{ selectedUser.profileData.birthday }}
              </div>
              <div class="detail-item">
                <span class="lbl">けつえきがた:</span>
                {{ selectedUser.profileData.bloodType }}型
              </div>
              <div class="detail-item">
                <span class="lbl">せいざ:</span>
                {{ selectedUser.profileData.zodiac }}
              </div>
              <div class="detail-item">
                <span class="lbl">すんでるところ:</span>
                {{ selectedUser.profileData.location }}
              </div>
              <div class="detail-item">
                <span class="lbl">視力:</span>
                {{ selectedUser.profileData.eyesight }}
              </div>
              <div class="detail-item">
                <span class="lbl">足サイズ:</span>
                {{ selectedUser.profileData.shoeSize }}cm
              </div>
              <div class="detail-item">
                <span class="lbl">利き手:</span>
                {{ selectedUser.profileData.dominantHand }}
              </div>
              <div class="detail-item">
                <span class="lbl">X:</span> @{{
                  selectedUser.profileData.twitter
                }}
              </div>
              <div class="detail-item full-width">
                <span class="lbl">Instagram:</span> @{{
                  selectedUser.profileData.instagram
                }}
              </div>
            </div>
          </div>
        </div>

        <!-- 穴埋め文章（自己紹介）エリア -->
        <div class="paper-section bio-sentence-box">
          <p class="bio-line">
            わたしは
            <span class="marker">{{
              selectedUser.profileData.personality
            }}</span>
            な性格で、 みんなからは
            <span class="marker">{{ selectedUser.profileData.nickname }}</span>
            って呼ばれてるよ！
          </p>
          <p class="bio-line">
            チャームポイントは
            <span class="marker">{{
              selectedUser.profileData.charmPoint
            }}</span>
            かな。
          </p>
          <p class="bio-line">
            よく
            <span class="marker">{{ selectedUser.profileData.looksLike }}</span>
            に似てるって言われるよ！
          </p>
          <p class="bio-line">
            ふだんは大体
            <span class="marker">{{
              selectedUser.profileData.sleepHours
            }}</span>
            時間睡眠で、 休みの日は
            <span class="marker">{{
              selectedUser.profileData.holidayActivity
            }}</span>
            してることが多いんだ。
          </p>
          <p class="bio-line">
            どうでもいいけどさっき
            <span class="marker">{{
              selectedUser.profileData.recentlyEaten
            }}</span>
            食べたよ。
          </p>
        </div>

        <!-- わたしのお気に入り（カラフル8マスグリッド） -->
        <div class="paper-section favorites-section">
          <div class="section-title">✨ わたしのお気に入り ✨</div>
          <div class="fav-grid">
            <div class="fav-card bg-yellow">
              <span class="fav-label">🍔 たべもの</span>
              <span class="fav-val">{{
                selectedUser.profileData.favoriteFood
              }}</span>
            </div>
            <div class="fav-card bg-green">
              <span class="fav-label">🧋 のみもの</span>
              <span class="fav-val">{{
                selectedUser.profileData.favoriteDrink
              }}</span>
            </div>
            <div class="fav-card bg-pink">
              <span class="fav-label">📺 アニメ/マンガ</span>
              <span class="fav-val">{{
                selectedUser.profileData.favoriteAnime
              }}</span>
            </div>
            <div class="fav-card bg-blue">
              <span class="fav-label">🐶 どうぶつ</span>
              <span class="fav-val">{{
                selectedUser.profileData.favoriteAnimal
              }}</span>
            </div>
            <div class="fav-card bg-purple">
              <span class="fav-label">🏠 ばしょ</span>
              <span class="fav-val">{{
                selectedUser.profileData.favoritePlace
              }}</span>
            </div>
            <div class="fav-card bg-orange">
              <span class="fav-label">🎨 いろ</span>
              <span class="fav-val">{{
                selectedUser.profileData.favoriteColor
              }}</span>
            </div>
            <div class="fav-card bg-lime">
              <span class="fav-label">🧂 ちょうみりょう</span>
              <span class="fav-val">{{
                selectedUser.profileData.favoriteSeasoning
              }}</span>
            </div>
            <div class="fav-card bg-rose">
              <span class="fav-label">✏️ フォント</span>
              <span class="fav-val">{{
                selectedUser.profileData.favoriteFont
              }}</span>
            </div>
          </div>
        </div>

        <!-- アクションボタン -->
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

      <!-- ==================================================== -->
      <!-- Case 2: 未フォロー/リクエスト中の場合 ➔ 錠前カギ付き非公開表示 -->
      <!-- ==================================================== -->
      <div v-else class="profile-card private-card">
        <div class="card-title-header center">
          <span class="user-display-name"
            >{{ selectedUser.name }} さんのプロフィール</span
          >
        </div>

        <div class="private-content">
          <div class="lock-icon">🔒</div>
          <div class="private-title">このプロフィールは非公開です</div>
          <div class="private-sub">
            フォローすると{{ selectedUser.name }}さんのプロフ帳を閲覧できます
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

const goToTop = () => {
  router.push("/");
};

// 手帳項目のデータ構造を統合したユーザーリスト
const users = ref([
  {
    id: 1,
    name: "鈴木 葵",
    idName: "aoi_suzuki",
    status: "following",
    isFollower: true,
    isRequesting: false,
    profileData: {
      date: "2026-07-29",
      avatar: "🍓",
      birthday: "04-12",
      bloodType: "A",
      eyesight: "1.2",
      twitter: "aoi_0412",
      shoeSize: "23.5",
      zodiac: "おひつじ座",
      location: "大阪府",
      dominantHand: "みぎ",
      instagram: "aoi_stgram",
      personality: "マイペース",
      nickname: "あおいちゃん",
      charmPoint: "えくぼ",
      looksLike: "シナモン",
      sleepHours: "7",
      holidayActivity: "カフェ巡りと写真撮影",
      recentlyEaten: "ストロベリータルト",
      favoriteFood: "いちご",
      favoriteDrink: "抹茶ラテ",
      favoriteAnime: "カードキャプターさくら",
      favoriteAnimal: "うさぎ",
      favoritePlace: "おうちのおふとん",
      favoriteColor: "ベビーピンク",
      favoriteSeasoning: "マヨネーズ",
      favoriteFont: "ポップ体",
    },
  },
  {
    id: 2,
    name: "佐藤 さくら",
    idName: "sakura_s",
    status: "none",
    isFollower: true,
    isRequesting: false,
    profileData: {
      date: "2026-07-28",
      avatar: "🌸",
      birthday: "03-15",
      bloodType: "O",
      eyesight: "1.0",
      twitter: "sakura_music",
      shoeSize: "24.0",
      zodiac: "うお座",
      location: "東京都",
      dominantHand: "みぎ",
      instagram: "sakura_live",
      personality: "明るい",
      nickname: "さくちゃん",
      charmPoint: "笑顔",
      looksLike: "ポチャッコ",
      sleepHours: "8",
      holidayActivity: "ライブに行くこと",
      recentlyEaten: "ラーメン",
      favoriteFood: "お寿司",
      favoriteDrink: "タピオカ",
      favoriteAnime: "ハイキュー!!",
      favoriteAnimal: "いぬ",
      favoritePlace: "ライブハウス",
      favoriteColor: "ミントグリーン",
      favoriteSeasoning: "醤油",
      favoriteFont: "丸ゴシック",
    },
  },
  {
    id: 3,
    name: "田中 健太",
    idName: "kenta_t",
    status: "requested",
    isFollower: true,
    isRequesting: false,
    profileData: {
      date: "2026-07-20",
      avatar: "🚗",
      birthday: "08-22",
      bloodType: "B",
      eyesight: "1.5",
      twitter: "kenta_drive",
      shoeSize: "26.5",
      zodiac: "しし座",
      location: "神奈川県",
      dominantHand: "みぎ",
      instagram: "kenta_photo",
      personality: "アクティブ",
      nickname: "ケンタ",
      charmPoint: "身長",
      looksLike: "ハンギョドン",
      sleepHours: "6",
      holidayActivity: "ドライブ",
      recentlyEaten: "ハンバーガー",
      favoriteFood: "焼肉",
      favoriteDrink: "コーラ",
      favoriteAnime: "呪術廻戦",
      favoriteAnimal: "ねこ",
      favoritePlace: "海",
      favoriteColor: "ブルー",
      favoriteSeasoning: "塩コショウ",
      favoriteFont: "ゴシック",
    },
  },
]);

const selectedUser = ref(users.value[0]);

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) return users.value;
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(query) ||
      u.idName.toLowerCase().includes(query),
  );
});

const followersList = computed(() =>
  filteredUsers.value.filter((u) => u.isFollower),
);
const followingList = computed(() =>
  filteredUsers.value.filter((u) => u.status === "following"),
);
const requestsList = computed(() =>
  filteredUsers.value.filter((u) => u.isRequesting),
);

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

const toggleFollow = (user) => {
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

const rejectSelectedUser = () => {
  selectedUser.value.status = "none";
};
</script>

<style scoped>
.page-container {
  width: 100%;
  min-height: 100vh;
  background-color: #fce8ee;
  font-family: "Hiragino Kaku Gothic ProN", sans-serif;
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
  color: #d85c80;
}

.content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 430px; /* スマホカードサイズ */
  margin: 0 auto;
}

/* 検索バー */
.search-bar {
  display: flex;
  background: #ffffff;
  border-radius: 20px;
  padding: 4px 4px 4px 14px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(216, 92, 128, 0.1);
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 12px;
}

.search-btn {
  background-color: #ff9ebb;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 6px 14px;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}

/* ==================================================== */
/* リアル手帳の1枚の紙風デザイン (profile-notebook-paper) */
/* ==================================================== */
.profile-notebook-paper {
  position: relative;
  background-color: #fffdf9; /* あたたかみのある紙の白 */
  border-radius: 20px;
  border: 3px solid #f3b6c8;
  padding: 18px 14px;
  box-shadow: 0 8px 16px rgba(216, 92, 128, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

/* バインダー穴（左側） */
.paper-binder-holes {
  position: absolute;
  top: 0;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
}

.paper-binder-holes .hole {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fce8ee;
  border: 1px solid #e2b3c0;
  display: inline-block;
}

/* マスキングテープ装飾 */
.masking-tape {
  position: absolute;
  top: 10px;
  right: -15px;
  width: 80px;
  height: 22px;
  background-color: rgba(254, 240, 138, 0.7); /* 黄色いシアーテープ */
  transform: rotate(25deg);
  border: 1px dashed #eab308;
  pointer-events: none;
}

.paper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  border-bottom: 2px dashed #f3b6c8;
  padding-bottom: 6px;
}

.paper-badge {
  background: #fef08a;
  color: #db2777;
  font-size: 11px;
  font-weight: bold;
  padding: 2px 10px;
  border-radius: 12px;
  transform: rotate(-2deg);
}

.paper-date {
  font-size: 10px;
  font-family: monospace;
  color: #f43f5e;
}

/* セクション：基本情報 */
.basic-info-section {
  display: flex;
  gap: 10px;
  background: rgba(255, 241, 242, 0.6);
  padding: 10px;
  border-radius: 14px;
  border: 1px solid #fecdd3;
}

.avatar-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.avatar-box {
  width: 56px;
  height: 56px;
  background: #ffffff;
  border: 2px solid #fda4af;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.user-id-tag {
  font-size: 9px;
  color: #9f1239;
  font-weight: bold;
}

.name-details {
  flex: 1;
}

.name-row {
  border-bottom: 1px solid #fecdd3;
  padding-bottom: 2px;
  margin-bottom: 4px;
}

.label-sub {
  font-size: 9px;
  color: #fb7185;
  font-weight: bold;
}

.user-name-text {
  margin: 0;
  font-size: 16px;
  color: #e11d48;
  font-weight: bold;
}

.grid-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px 6px;
  font-size: 10px;
}

.detail-item {
  border-bottom: 1px dotted #fca5a5;
  padding: 1px 0;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail-item .lbl {
  color: #fb7185;
}

.detail-item.full-width {
  grid-column: span 2;
}

/* 穴埋め文章エリア */
.bio-sentence-box {
  background: #ffffff;
  border: 1px solid #fecdd3;
  border-radius: 12px;
  padding: 10px;
  font-size: 11px;
  color: #4b5563;
  line-height: 1.6;
}

.bio-line {
  margin: 2px 0;
}

.marker {
  background-color: #fef08a;
  color: #be123c;
  font-weight: bold;
  padding: 1px 6px;
  border-radius: 4px;
}

/* お気に入り8マス */
.favorites-section .section-title {
  font-size: 11px;
  font-weight: bold;
  color: #f43f5e;
  text-align: center;
  margin-bottom: 6px;
}

.fav-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.fav-card {
  padding: 6px 8px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.fav-label {
  font-size: 9px;
  font-weight: bold;
}

.fav-val {
  font-size: 11px;
  font-weight: bold;
  color: #1f2937;
  margin-top: 1px;
}

/* お気に入りパステル背景色 */
.bg-yellow {
  background: #fef9c3;
  border: 1px solid #fef08a;
  .fav-label {
    color: #ca8a04;
  }
}
.bg-green {
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  .fav-label {
    color: #16a34a;
  }
}
.bg-pink {
  background: #ffe4e6;
  border: 1px solid #fecdd3;
  .fav-label {
    color: #e11d48;
  }
}
.bg-blue {
  background: #e0f2fe;
  border: 1px solid #bae6fd;
  .fav-label {
    color: #0284c7;
  }
}
.bg-purple {
  background: #f3e8ff;
  border: 1px solid #e9d5ff;
  .fav-label {
    color: #9333ea;
  }
}
.bg-orange {
  background: #ffedd5;
  border: 1px solid #fed7aa;
  .fav-label {
    color: #ea580c;
  }
}
.bg-lime {
  background: #ecfccb;
  border: 1px solid #d9f99d;
  .fav-label {
    color: #65a30d;
  }
}
.bg-rose {
  background: #ffe4e6;
  border: 1px solid #fda4af;
  .fav-label {
    color: #e11d48;
  }
}

/* カード内アクションボタン */
.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
}

.center-action {
  justify-content: center;
}

.btn {
  border-radius: 16px;
  font-size: 11px;
  font-weight: bold;
  padding: 6px 16px;
  cursor: pointer;
  border: none;
  transition: transform 0.1s;
}

.btn:active {
  transform: scale(0.95);
}

.btn-sm {
  padding: 4px 12px;
  font-size: 10px;
}

.btn-reject {
  background: #f1f5f9;
  color: #64748b;
}

.btn-follow-action {
  background: #ff9ebb;
  color: white;
}

.btn-requested-state {
  background: #e2e8f0;
  color: #64748b;
}

.btn-following-state {
  background: #ffffff;
  color: #db2777;
  border: 1.5px solid #f472b6;
}

.btn-accept {
  background: #4ade80;
  color: white;
}

.btn-delete {
  background: #e2e8f0;
  color: #64748b;
}

/* 非公開カード表示 */
.private-card {
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  padding: 24px 16px;
  border: 2px solid #fecdd3;
}

.private-content {
  margin: 16px 0;
}

.lock-icon {
  font-size: 28px;
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
  border-bottom: 2px solid #fbcfe8;
  margin-top: 6px;
}

.tab-button {
  flex: 1;
  background: none;
  border: none;
  padding: 8px 0;
  font-size: 12px;
  font-weight: bold;
  color: #9d4c6c;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

.tab-button.active {
  color: #db2777;
  border-bottom-color: #db2777;
}

.badge {
  background: #f43f5e;
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
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 1px solid #fecdd3;
}

.user-item.active {
  border: 2px solid #ff9ebb;
  background-color: #fff1f2;
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
