<template>
  <div class="page-container">
    <!-- ヘッダー -->
    <header class="header">
      <button class="back-btn" @click="goToTop">＜</button>
      <h1 class="title">
        {{ isEditing ? "📝 プロフィール作成・編集" : "📖 プロフィール編集 🎀" }}
      </h1>
    </header>

    <!-- メインコンテンツ（スマホサイズ幅に固定） -->
    <main class="content">
      <!-- ==================================================== -->
      <!-- ① プレビュー（閲覧）画面                            -->
      <!-- ==================================================== -->
      <div v-if="!isEditing" class="profile-notebook-paper">
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
            >DATE: {{ formData.date || "2026.07.29" }}</span
          >
        </div>

        <!-- メイン基本情報エリア -->
        <div class="paper-section basic-info-section">
          <div class="avatar-area">
            <div class="avatar-box">
              {{ formData.avatar || "💖" }}
            </div>
            <span class="user-id-tag">@{{ formData.twitter || "yumemi" }}</span>
          </div>

          <div class="name-details">
            <div class="name-row">
              <span class="label-sub">なまえ</span>
              <h2 class="user-name-text">{{ formData.name || "未入力" }}</h2>
            </div>

            <!-- ドット線で仕切られた基本情報グリッド -->
            <div class="grid-details">
              <div class="detail-item">
                <span class="lbl">たんじょうび:</span> {{ formData.birthday }}
              </div>
              <div class="detail-item">
                <span class="lbl">けつえきがた:</span>
                {{ formData.bloodType }}型
              </div>
              <div class="detail-item">
                <span class="lbl">せいざ:</span> {{ formData.zodiac }}
              </div>
              <div class="detail-item">
                <span class="lbl">すんでるところ:</span> {{ formData.location }}
              </div>
              <div class="detail-item">
                <span class="lbl">視力:</span> {{ formData.eyesight }}
              </div>
              <div class="detail-item">
                <span class="lbl">足サイズ:</span> {{ formData.shoeSize }}cm
              </div>
              <div class="detail-item">
                <span class="lbl">利き手:</span> {{ formData.dominantHand }}
              </div>
              <div class="detail-item">
                <span class="lbl">X:</span> @{{ formData.twitter }}
              </div>
              <div class="detail-item full-width">
                <span class="lbl">Instagram:</span> @{{ formData.instagram }}
              </div>
            </div>
          </div>
        </div>

        <!-- 穴埋め文章（自己紹介）エリア -->
        <div class="paper-section bio-sentence-box">
          <p class="bio-line">
            わたしは
            <span class="marker">{{ formData.personality }}</span> な性格で、
            みんなからは
            <span class="marker">{{ formData.nickname }}</span>
            って呼ばれてるよ！
          </p>
          <p class="bio-line">
            チャームポイントは
            <span class="marker">{{ formData.charmPoint }}</span> かな。
          </p>
          <p class="bio-line">
            よく
            <span class="marker">{{ formData.looksLike }}</span>
            に似てるって言われるよ！
          </p>
          <p class="bio-line">
            ふだんは大体
            <span class="marker">{{ formData.sleepHours }}</span> 時間睡眠で、
            休みの日は
            <span class="marker">{{ formData.holidayActivity }}</span>
            してることが多いんだ。
          </p>
          <p class="bio-line">
            どうでもいいけどさっき
            <span class="marker">{{ formData.recentlyEaten }}</span> 食べたよ。
          </p>
        </div>

        <!-- わたしのお気に入り（カラフル8マスグリッド） -->
        <div class="paper-section favorites-section">
          <div class="section-title">✨ わたしのお気に入り ✨</div>
          <div class="fav-grid">
            <div class="fav-card bg-yellow">
              <span class="fav-label">🍔 たべもの</span>
              <span class="fav-val">{{ formData.favoriteFood }}</span>
            </div>
            <div class="fav-card bg-green">
              <span class="fav-label">🧋 のみもの</span>
              <span class="fav-val">{{ formData.favoriteDrink }}</span>
            </div>
            <div class="fav-card bg-pink">
              <span class="fav-label">📺 アニメ/マンガ</span>
              <span class="fav-val">{{ formData.favoriteAnime }}</span>
            </div>
            <div class="fav-card bg-blue">
              <span class="fav-label">🐶 どうぶつ</span>
              <span class="fav-val">{{ formData.favoriteAnimal }}</span>
            </div>
            <div class="fav-card bg-purple">
              <span class="fav-label">🏠 ばしょ</span>
              <span class="fav-val">{{ formData.favoritePlace }}</span>
            </div>
            <div class="fav-card bg-orange">
              <span class="fav-label">🎨 いろ</span>
              <span class="fav-val">{{ formData.favoriteColor }}</span>
            </div>
            <div class="fav-card bg-lime">
              <span class="fav-label">🧂 ちょうみりょう</span>
              <span class="fav-val">{{ formData.favoriteSeasoning }}</span>
            </div>
            <div class="fav-card bg-rose">
              <span class="fav-label">✏️ フォント</span>
              <span class="fav-val">{{ formData.favoriteFont }}</span>
            </div>
          </div>
        </div>

        <!-- 下部アクションボタン (2つ配置) -->
        <div class="bottom-btn-group">
          <button class="action-btn btn-edit" @click="toggleEditMode">
            ✏️ 編集する
          </button>
          <button class="action-btn btn-share" @click="handleShare">
            🔗 閲覧する / 共有する
          </button>
        </div>
      </div>

      <!-- ==================================================== -->
      <!-- ② 編集（入力フォーム）画面                         -->
      <!-- ==================================================== -->
      <div v-else class="edit-form-card">
        <!-- タブ切替 -->
        <div class="tab-header">
          <button
            :class="['tab-btn', { active: activeTab === 'basic' }]"
            @click="activeTab = 'basic'"
          >
            基本情報
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'bio' }]"
            @click="activeTab = 'bio'"
          >
            自己紹介
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'favorites' }]"
            @click="activeTab = 'favorites'"
          >
            お気に入り
          </button>
        </div>

        <!-- タブ1: 基本情報フォーム -->
        <div v-show="activeTab === 'basic'" class="form-section">
          <div class="form-row gap">
            <div class="form-group">
              <label>ひづけ</label>
              <input v-model="formData.date" type="date" class="form-input" />
            </div>
            <div class="form-group">
              <label>アイコン (絵文字)</label>
              <input v-model="formData.avatar" type="text" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label>なまえ</label>
            <input v-model="formData.name" type="text" class="form-input" />
          </div>

          <div class="form-row gap">
            <div class="form-group">
              <label>たんじょうび</label>
              <input
                v-model="formData.birthday"
                type="text"
                placeholder="MM-DD"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>けつえきがた</label>
              <select v-model="formData.bloodType" class="form-input">
                <option value="A">A型</option>
                <option value="B">B型</option>
                <option value="O">O型</option>
                <option value="AB">AB型</option>
              </select>
            </div>
          </div>

          <div class="form-row gap">
            <div class="form-group">
              <label>せいざ</label>
              <input v-model="formData.zodiac" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>すんでるところ</label>
              <input
                v-model="formData.location"
                type="text"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-row gap-three">
            <div class="form-group">
              <label>視力</label>
              <input
                v-model="formData.eyesight"
                type="text"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>足サイズ</label>
              <input
                v-model="formData.shoeSize"
                type="text"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>利き手</label>
              <input
                v-model="formData.dominantHand"
                type="text"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label>X (@)</label>
            <input v-model="formData.twitter" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label>Instagram (@)</label>
            <input
              v-model="formData.instagram"
              type="text"
              class="form-input"
            />
          </div>
        </div>

        <!-- タブ2: 自己紹介フォーム -->
        <div v-show="activeTab === 'bio'" class="form-section">
          <div class="form-group">
            <label>どんな性格？</label>
            <input
              v-model="formData.personality"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>みんなからの呼ばれ方</label>
            <input v-model="formData.nickname" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label>チャームポイント</label>
            <input
              v-model="formData.charmPoint"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>似てると言われるもの</label>
            <input
              v-model="formData.looksLike"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>睡眠時間 (時間)</label>
            <input
              v-model="formData.sleepHours"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>休みの日の過ごし方</label>
            <input
              v-model="formData.holidayActivity"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>さっき食べたもの</label>
            <input
              v-model="formData.recentlyEaten"
              type="text"
              class="form-input"
            />
          </div>
        </div>

        <!-- タブ3: お気に入りフォーム -->
        <div v-show="activeTab === 'favorites'" class="form-section grid-form">
          <div class="form-group">
            <label class="lbl-yellow">🍔 たべもの</label>
            <input
              v-model="formData.favoriteFood"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="lbl-green">🧋 のみもの</label>
            <input
              v-model="formData.favoriteDrink"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="lbl-pink">📺 アニメ/マンガ</label>
            <input
              v-model="formData.favoriteAnime"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="lbl-blue">🐶 どうぶつ</label>
            <input
              v-model="formData.favoriteAnimal"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="lbl-purple">🏠 ばしょ</label>
            <input
              v-model="formData.favoritePlace"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="lbl-orange">🎨 いろ</label>
            <input
              v-model="formData.favoriteColor"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="lbl-lime">🧂 ちょうみりょう</label>
            <input
              v-model="formData.favoriteSeasoning"
              type="text"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="lbl-rose">✏️ フォント</label>
            <input
              v-model="formData.favoriteFont"
              type="text"
              class="form-input"
            />
          </div>
        </div>

        <!-- 保存ボタン -->
        <div class="form-actions">
          <button class="action-btn btn-save" @click="toggleEditMode">
            💖 保存してプレビューを見る
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// --- モード切替ステート (false: 閲覧 / true: 編集) ---
const isEditing = ref(false);
const activeTab = ref("basic");

// --- プロフィールフォームデータ ---
const formData = reactive({
  date: "2026-07-29",
  avatar: "💖",
  name: "ゆめみ",
  birthday: "04-12",
  bloodType: "A",
  eyesight: "1.2",
  twitter: "yumemi_2026",
  shoeSize: "23.5",
  zodiac: "おひつじ座",
  location: "とうきょう",
  dominantHand: "みぎ",
  instagram: "yumestagram",
  personality: "マイペース",
  nickname: "ゆめちゃん",
  charmPoint: "えくぼ",
  looksLike: "シナモン",
  sleepHours: "7",
  holidayActivity: "カフェ巡りと推し活",
  recentlyEaten: "ストロベリータルト",
  favoriteFood: "いちご",
  favoriteDrink: "抹茶ラテ",
  favoriteAnime: "カードキャプターさくら",
  favoriteAnimal: "うさぎ",
  favoritePlace: "おうちのおふとん",
  favoriteColor: "ベビーピンク",
  favoriteSeasoning: "マヨネーズ",
  favoriteFont: "ポップ体",
});

const goToTop = () => {
  router.push("/");
};

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleShare = () => {
  alert("プロフィールの共有リンクをコピーしました！");
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
  max-width: 430px;
  margin: 0 auto;
}

/* ==================================================== */
/* プレビュー：紙手帳風デザイン                         */
/* ==================================================== */
.profile-notebook-paper {
  position: relative;
  background-color: #fffdf9;
  border-radius: 20px;
  border: 3px solid #f3b6c8;
  padding: 18px 14px;
  box-shadow: 0 8px 16px rgba(216, 92, 128, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

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
}

.masking-tape {
  position: absolute;
  top: 10px;
  right: -15px;
  width: 80px;
  height: 22px;
  background-color: rgba(254, 240, 138, 0.7);
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

/* 基本情報エリア */
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

/* 穴埋め自己紹介 */
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

/* 下部アクションボタン (2行・グリッド配置) */
.bottom-btn-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.action-btn {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s;
}

.action-btn:active {
  transform: scale(0.97);
}

.btn-edit {
  background-color: #ff9ebb;
  color: white;
}

.btn-share {
  background-color: #ffffff;
  color: #d85c80;
  border: 2px solid #ff9ebb;
}

/* ==================================================== */
/* ② 編集フォームカードデザイン                       */
/* ==================================================== */
.edit-form-card {
  background: #ffffff;
  border-radius: 20px;
  border: 2px solid #fecdd3;
  padding: 14px;
  box-shadow: 0 4px 12px rgba(216, 92, 128, 0.1);
}

.tab-header {
  display: flex;
  background: #ffe4e6;
  border-radius: 12px;
  padding: 3px;
  margin-bottom: 14px;
}

.tab-btn {
  flex: 1;
  border: none;
  background: none;
  padding: 8px 0;
  font-size: 11px;
  font-weight: bold;
  color: #9f1239;
  border-radius: 10px;
  cursor: pointer;
}

.tab-btn.active {
  background: #ffffff;
  color: #e11d48;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 10px;
  font-weight: bold;
  color: #db2777;
}

.form-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #fecdd3;
  font-size: 11px;
  outline: none;
  box-sizing: border-box;
  background-color: #fffdf9;
}

.form-input:focus {
  border-color: #f43f5e;
  box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.2);
}

.form-row {
  display: flex;
}

.form-row.gap {
  gap: 8px;
}
.form-row.gap > div {
  flex: 1;
}

.form-row.gap-three {
  gap: 6px;
}
.form-row.gap-three > div {
  flex: 1;
}

.btn-save {
  background-color: #4ade80;
  color: white;
  margin-top: 14px;
}

.lbl-yellow {
  color: #ca8a04 !important;
}
.lbl-green {
  color: #16a34a !important;
}
.lbl-pink {
  color: #e11d48 !important;
}
.lbl-blue {
  color: #0284c7 !important;
}
.lbl-purple {
  color: #9333ea !important;
}
.lbl-orange {
  color: #ea580c !important;
}
.lbl-lime {
  color: #65a30d !important;
}
.lbl-rose {
  color: #e11d48 !important;
}
</style>
