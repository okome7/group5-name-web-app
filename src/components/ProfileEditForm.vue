<script setup>
import { ref } from "vue";

defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

defineEmits(["save", "cancel"]);

// タブ切り替えステート
const activeTab = ref("basic"); // 'basic' | 'bio' | 'favorites'
</script>

<template>
  <div class="p-4 flex-1 flex flex-col justify-between">
    <div class="space-y-4">
      <!-- ヘッダー -->
      <div
        class="flex items-center justify-between pb-2 border-b-2 border-pink-200"
      >
        <h2 class="text-sm font-bold text-pink-600 flex items-center gap-1">
          📝 プロフィールをこうしん
        </h2>
        <button
          @click="$emit('cancel')"
          class="text-xs text-gray-400 hover:text-pink-500"
        >
          キャンセル
        </button>
      </div>

      <!-- セクションタブ -->
      <div class="flex gap-1 bg-pink-100 p-1 rounded-xl">
        <button
          @click="activeTab = 'basic'"
          :class="[
            'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all',
            activeTab === 'basic'
              ? 'bg-white text-pink-500 shadow-sm'
              : 'text-gray-500',
          ]"
        >
          基本情報
        </button>
        <button
          @click="activeTab = 'bio'"
          :class="[
            'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all',
            activeTab === 'bio'
              ? 'bg-white text-pink-500 shadow-sm'
              : 'text-gray-500',
          ]"
        >
          自己紹介
        </button>
        <button
          @click="activeTab = 'favorites'"
          :class="[
            'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all',
            activeTab === 'favorites'
              ? 'bg-white text-pink-500 shadow-sm'
              : 'text-gray-500',
          ]"
        >
          お気に入り
        </button>
      </div>

      <!-- タブ1: 基本情報 -->
      <div v-show="activeTab === 'basic'" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-pink-500 font-bold mb-1">ひづけ</label>
            <input
              v-model="formData.date"
              type="date"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-pink-500 font-bold mb-1"
              >アイコン (絵文字)</label
            >
            <input
              v-model="formData.avatar"
              type="text"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
        </div>

        <div>
          <label class="block text-pink-500 font-bold mb-1">なまえ</label>
          <input
            v-model="formData.name"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-pink-500 font-bold mb-1"
              >たんじょうび</label
            >
            <input
              v-model="formData.birthday"
              type="text"
              placeholder="MM-DD"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-pink-500 font-bold mb-1"
              >けつえきがた</label
            >
            <select
              v-model="formData.bloodType"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            >
              <option value="A">A型</option>
              <option value="B">B型</option>
              <option value="O">O型</option>
              <option value="AB">AB型</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-pink-500 font-bold mb-1">せいざ</label>
            <input
              v-model="formData.zodiac"
              type="text"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-pink-500 font-bold mb-1"
              >すんでるところ</label
            >
            <input
              v-model="formData.location"
              type="text"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block text-pink-500 font-bold mb-1">視力</label>
            <input
              v-model="formData.eyesight"
              type="text"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-pink-500 font-bold mb-1">足サイズ</label>
            <input
              v-model="formData.shoeSize"
              type="text"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-pink-500 font-bold mb-1">利き手</label>
            <input
              v-model="formData.dominantHand"
              type="text"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
        </div>

        <div>
          <label class="block text-pink-500 font-bold mb-1">X (@)</label>
          <input
            v-model="formData.twitter"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div>
          <label class="block text-pink-500 font-bold mb-1"
            >Instagram (@)</label
          >
          <input
            v-model="formData.instagram"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
      </div>

      <!-- タブ2: 自己紹介 -->
      <div v-show="activeTab === 'bio'" class="space-y-3 text-xs">
        <div>
          <label class="block text-pink-500 font-bold mb-1">どんな性格？</label>
          <input
            v-model="formData.personality"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div>
          <label class="block text-pink-500 font-bold mb-1"
            >みんなからの呼ばれ方</label
          >
          <input
            v-model="formData.nickname"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div>
          <label class="block text-pink-500 font-bold mb-1"
            >チャームポイント</label
          >
          <input
            v-model="formData.charmPoint"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div>
          <label class="block text-pink-500 font-bold mb-1"
            >似てると言われるもの</label
          >
          <input
            v-model="formData.looksLike"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div>
          <label class="block text-pink-500 font-bold mb-1"
            >睡眠時間 (時間)</label
          >
          <input
            v-model="formData.sleepHours"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div>
          <label class="block text-pink-500 font-bold mb-1"
            >休みの日の過ごし方</label
          >
          <input
            v-model="formData.holidayActivity"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
        <div>
          <label class="block text-pink-500 font-bold mb-1"
            >さっき食べたもの</label
          >
          <input
            v-model="formData.recentlyEaten"
            type="text"
            class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>
      </div>

      <!-- タブ3: お気に入り -->
      <div v-show="activeTab === 'favorites'" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-yellow-600 font-bold mb-1"
              >🍔 たべもの</label
            >
            <input
              v-model="formData.favoriteFood"
              type="text"
              class="w-full p-2 rounded-xl border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-emerald-600 font-bold mb-1"
              >🧋 のみもの</label
            >
            <input
              v-model="formData.favoriteDrink"
              type="text"
              class="w-full p-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-pink-600 font-bold mb-1"
              >📺 アニメ・まんが</label
            >
            <input
              v-model="formData.favoriteAnime"
              type="text"
              class="w-full p-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-sky-600 font-bold mb-1">🐶 どうぶつ</label>
            <input
              v-model="formData.favoriteAnimal"
              type="text"
              class="w-full p-2 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-purple-600 font-bold mb-1"
              >🏠 ばしょ</label
            >
            <input
              v-model="formData.favoritePlace"
              type="text"
              class="w-full p-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-orange-600 font-bold mb-1">🎨 いろ</label>
            <input
              v-model="formData.favoriteColor"
              type="text"
              class="w-full p-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-lime-600 font-bold mb-1"
              >🧂 ちょうみりょう</label
            >
            <input
              v-model="formData.favoriteSeasoning"
              type="text"
              class="w-full p-2 rounded-xl border border-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-300 bg-white"
            />
          </div>
          <div>
            <label class="block text-rose-600 font-bold mb-1"
              >✏️ フォント</label
            >
            <input
              v-model="formData.favoriteFont"
              type="text"
              class="w-full p-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 保存ボタン -->
    <div class="pt-4">
      <button
        @click="$emit('save')"
        class="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-full shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-emerald-200"
      >
        💖 保存してプレビューをみる
      </button>
    </div>
  </div>
</template>
