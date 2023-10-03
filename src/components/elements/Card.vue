<script setup>
const props = defineProps({
  description: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
	<div class="card">
		<slot />
		<div :class="['desc', {loading: isLoading}]">
			<div class="desc__heading">{{ description.heading }}</div>
			<div class="desc__main">
				<div class="desc__p desc__p1">{{ description.p1 }}</div>
				<div class="desc__p desc__p2">{{ description.p2 }}</div>
				<div class="desc__p desc__p3">{{ description.p3 }}</div>
				<div class="desc__p desc__p4">{{ description.p4 }}</div>
				<div class="desc__p desc__p5">{{ description.p5 }}</div>
			</div>
			<div class="desc__ending">{{ description.ending }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.card {
	width: 236px;
	height: 500px;
	border-radius: 12px;
	border: 1px solid var(--primary-border, #4D4D4D);
	padding: 18px 14px 24px 14px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	background: var(--seondary-bg, #262626);

	.desc {
		width: 190px;
		height: 198px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: transparent;
		.desc__heading {
			width: 190px;
			height: 26px;
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
			.desc__p1 {
				width: 155px;
			}
			.desc__p2 {
				width: 190px;
			}
			.desc__p3 {
				width: 170px;
			}
			.desc__p4 {
				width: 160px;
			}
			.desc__p5 {
				width: 140px;
			}
		}
		.desc__ending {
			width: 80px;
			height: 10px;
			border-radius: 4px;
			margin-top: 24px;
		}
	}

	.desc.loading {
		.desc__heading, .desc__p, .desc__ending {
			background: var(--skeleton, linear-gradient(90deg, #3C3C3C 0%, #444 51.04%, #333 100%));
		}
	}
}
</style>
