<script setup>
import { ref } from 'vue';
import Button from '@/components/elements/ui/Button.vue';
import Item from '@/components/elements/Item.vue';
import Input from '@/components/elements/ui/Input.vue';
import Modal from '@/components/layouts/Modal.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['delete']);

const amountMode = ref(false);
const inputValue = ref('');

const setAmountMode = (value) => {
  amountMode.value = value;
};

const onDelete = (modalRef) => {
  if (inputValue.value) {
    emit('delete', inputValue.value, modalRef);
  }
};
</script>

<template>
	<Modal>
		<template #header>
			<Item
				class="item"
				:main-color="item.mainColor"
				:secondary-color="item.secondaryColor"
				:width="54"
				:height="54"
			/>
		</template>
		<template #body>
			<div :class="['desc', {loading: isLoading}]">
				<div class="desc__heading">{{ item.description.heading || '' }}</div>
				<div class="desc__main">
					<div class="desc__p desc__p1">{{ item.description.p1 || '' }}</div>
					<div class="desc__p desc__p2">{{ item.description.p2 || '' }}</div>
					<div class="desc__p desc__p3">{{ item.description.p3 || '' }}</div>
					<div class="desc__p desc__p4">{{ item.description.p4 || '' }}</div>
					<div class="desc__p desc__p5">{{ item.description.p5 || '' }}</div>
				</div>
			</div>
		</template>
		<template #footer="{ modalRef }">
			<Button @click="setAmountMode(true)">Удалить предмет</Button>
			<div v-if="amountMode" class="amount-mode">
				<Input
					id="amount"
					name="amount"
					v-model="inputValue"
					placeholder="Введите количество"
				/>
				<div class="buttons">
					<Button
						class="buttons__cancel-btn"
						@click="setAmountMode(false)"
					>
						Отмена
					</Button>
					<Button
						class="buttons__apply-btn"
						@click="onDelete(modalRef)"
					>
						Подтвердить
					</Button>
				</div>
			</div>
		</template>
	</Modal>
</template>

<style lang="scss" scoped>
.item {
	scale: (2.4);
}

.desc {
	.desc__heading {
		width: 211px;
		height: 30px;
		border-radius: 8px;
		margin-bottom: 24px;
	}

	.desc__main {
		display: flex;
		flex-direction: column;
		align-items: center;

		.desc__p:not(:last-child) {
			margin-bottom: 16px;
		}

		.desc__p {
			height: 10px;
			border-radius: 4px;
		}

		.desc__p1, .desc__p2, .desc__p3 {
			width: 211px;
		}

		.desc__p4 {
			width: 180px;
		}

		.desc__p5 {
			width: 80px;
		}
	}
}

.desc.loading {
	.desc__heading, .desc__p {
		background: var(--skeleton, linear-gradient(90deg, #3C3C3C 0%, #444 51.04%, #333 100%));
	}
}

.amount-mode {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 133px;
	border-bottom-right-radius: 12px;
	border: 1px solid var(--primary-border, #4D4D4D);
	padding: 18px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: rgba(38, 38, 38, 0.60);
	backdrop-filter: blur(8px);

	.buttons {
		display: flex;
		justify-content: space-between;

		.buttons__cancel-btn {
			width: 88px;
			color: var(--primary-black, #2D2D2D);
			background: var(--primary-white, #FFFFFF);
		}

		.buttons__apply-btn {
			width: 112px;
			color: var(--primary-white, #FFFFFF);
			background: var(--primary-red, #FA7272);
		}
	}
}
</style>
