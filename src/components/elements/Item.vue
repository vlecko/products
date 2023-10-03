<script setup>
const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  mainColor: {
    type: String,
    required: true,
  },
  secondaryColor: {
    type: String,
    required: true,
  },
});
</script>

<template>
	<div class="item">
		<svg
			:width="`${width}`"
			:height="`${height}`"
			:viewBox="`0 0 ${width} ${height}`"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="Item Image">
				<rect
					id="Rectangle 8"
					y="6"
					:width="`${width / 1.125}`"
					:height="`${height / 1.125}`"
					:fill="`${mainColor}`"
				/>
				<g id="Rectangle 9" filter="url(#filter0_b_0_17)">
					<rect
						x="6"
						:width="`${width / 1.125}`"
						:height="`${height / 1.125}`"
						:fill="`${secondaryColor}`"
						fill-opacity="0.35"
					/>
				</g>
			</g>
			<defs>
				<filter
					id="filter0_b_0_17"
					x="-6"
					y="-12"
					:width="`${width * 4/3}`"
					:height="`${height * 4/3}`"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
					<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_17" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_17" result="shape" />
				</filter>
			</defs>
		</svg>
	</div>
</template>

<style lang="scss" scoped />
