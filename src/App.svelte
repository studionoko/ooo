<script>
  import { Router, Link, Route } from 'svelte-routing'
  import Stamp from './sketches/stamp/index.svelte'
  import Path from './sketches/path/index.svelte'

  const detectHome = window.location.pathname === '/'
    ? 'sketches/path'
    : window.location.pathname

  let url = detectHome
</script>

<Router {url}>
  <main>
    <Route path="sketches/stamp" component={Stamp}/>
    <Route path="sketches/path" component={Path}/>
  </main>
  <nav>
    <Link to="sketches/path">path</Link>
    <Link to="sketches/stamp">stamp</Link>
  </nav>

  <div class="logo">
    <Link to="/">
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
      	<g>
      	  <circle cx="250" cy="250" r="236.5" stroke="black" stroke-width="21.0052"/>
      	  <path d="M346.589 346.589C299.464 393.715 245.77 424.627 197.469 436.871C148.918 449.178 107.832 442.293 82.7695 417.231C57.7073 392.168 50.8219 351.082 63.1292 302.531C75.3731 254.23 106.285 200.536 153.411 153.411C200.536 106.285 254.23 75.3731 302.532 63.1291C351.083 50.8219 392.168 57.7073 417.231 82.7695C442.293 107.832 449.178 148.918 436.871 197.469C424.627 245.77 393.715 299.464 346.589 346.589Z" stroke="black" stroke-width="21.0052"/>
      	  <path d="M219.031 280.969C171.172 233.109 132.338 185.735 108.197 147.989C96.0797 129.043 87.9809 113.01 84.1378 100.849C82.2121 94.7549 81.5355 90.1857 81.6494 87.0053C81.7607 83.8976 82.5676 82.9714 82.7695 82.7695C82.9715 82.5675 83.8976 81.7607 87.0053 81.6494C90.1858 81.5355 94.7549 82.2121 100.849 84.1378C113.01 87.9809 129.043 96.0797 147.989 108.197C185.735 132.338 233.109 171.172 280.969 219.031C328.828 266.891 367.662 314.265 391.803 352.011C403.92 370.957 412.019 386.99 415.862 399.151C417.788 405.245 418.465 409.814 418.351 412.995C418.239 416.102 417.432 417.029 417.231 417.231C417.029 417.432 416.102 418.239 412.995 418.351C409.814 418.465 405.245 417.788 399.151 415.862C386.99 412.019 370.957 403.92 352.011 391.803C314.265 367.662 266.891 328.828 219.031 280.969Z" stroke="black" stroke-width="21.0052"/>
      	  <path d="M15.2073 484.793L484.793 15.2073" stroke="black" stroke-width="21.0052"/>
      	</g>
      </svg>
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
      	<g>
      	  <circle cx="250" cy="250" r="236.5" stroke="black" stroke-width="21.0052"/>
      	  <path d="M346.589 346.589C299.464 393.715 245.77 424.627 197.469 436.871C148.918 449.178 107.832 442.293 82.7695 417.231C57.7073 392.168 50.8219 351.082 63.1292 302.531C75.3731 254.23 106.285 200.536 153.411 153.411C200.536 106.285 254.23 75.3731 302.532 63.1291C351.083 50.8219 392.168 57.7073 417.231 82.7695C442.293 107.832 449.178 148.918 436.871 197.469C424.627 245.77 393.715 299.464 346.589 346.589Z" stroke="black" stroke-width="21.0052"/>
      	  <path d="M219.031 280.969C171.172 233.109 132.338 185.735 108.197 147.989C96.0797 129.043 87.9809 113.01 84.1378 100.849C82.2121 94.7549 81.5355 90.1857 81.6494 87.0053C81.7607 83.8976 82.5676 82.9714 82.7695 82.7695C82.9715 82.5675 83.8976 81.7607 87.0053 81.6494C90.1858 81.5355 94.7549 82.2121 100.849 84.1378C113.01 87.9809 129.043 96.0797 147.989 108.197C185.735 132.338 233.109 171.172 280.969 219.031C328.828 266.891 367.662 314.265 391.803 352.011C403.92 370.957 412.019 386.99 415.862 399.151C417.788 405.245 418.465 409.814 418.351 412.995C418.239 416.102 417.432 417.029 417.231 417.231C417.029 417.432 416.102 418.239 412.995 418.351C409.814 418.465 405.245 417.788 399.151 415.862C386.99 412.019 370.957 403.92 352.011 391.803C314.265 367.662 266.891 328.828 219.031 280.969Z" stroke="black" stroke-width="21.0052"/>
      	  <path d="M15.2073 484.793L484.793 15.2073" stroke="black" stroke-width="21.0052"/>
      	</g>
      </svg>
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
      	<g>
      	  <circle cx="250" cy="250" r="236.5" stroke="black" stroke-width="21.0052"/>
      	  <path d="M346.589 346.589C299.464 393.715 245.77 424.627 197.469 436.871C148.918 449.178 107.832 442.293 82.7695 417.231C57.7073 392.168 50.8219 351.082 63.1292 302.531C75.3731 254.23 106.285 200.536 153.411 153.411C200.536 106.285 254.23 75.3731 302.532 63.1291C351.083 50.8219 392.168 57.7073 417.231 82.7695C442.293 107.832 449.178 148.918 436.871 197.469C424.627 245.77 393.715 299.464 346.589 346.589Z" stroke="black" stroke-width="21.0052"/>
      	  <path d="M219.031 280.969C171.172 233.109 132.338 185.735 108.197 147.989C96.0797 129.043 87.9809 113.01 84.1378 100.849C82.2121 94.7549 81.5355 90.1857 81.6494 87.0053C81.7607 83.8976 82.5676 82.9714 82.7695 82.7695C82.9715 82.5675 83.8976 81.7607 87.0053 81.6494C90.1858 81.5355 94.7549 82.2121 100.849 84.1378C113.01 87.9809 129.043 96.0797 147.989 108.197C185.735 132.338 233.109 171.172 280.969 219.031C328.828 266.891 367.662 314.265 391.803 352.011C403.92 370.957 412.019 386.99 415.862 399.151C417.788 405.245 418.465 409.814 418.351 412.995C418.239 416.102 417.432 417.029 417.231 417.231C417.029 417.432 416.102 418.239 412.995 418.351C409.814 418.465 405.245 417.788 399.151 415.862C386.99 412.019 370.957 403.92 352.011 391.803C314.265 367.662 266.891 328.828 219.031 280.969Z" stroke="black" stroke-width="21.0052"/>
      	  <path d="M15.2073 484.793L484.793 15.2073" stroke="black" stroke-width="21.0052"/>
      	</g>
      </svg>
    </Link>
  </div>
</Router>

<style>
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.ttf') format('truetype');
  font-weight: 125 950;
  font-style: oblique -20deg 20deg;
}

nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0.5rem;
  right: 0.5rem;
  mix-blend-mode: exclusion;
  line-height: 1em;
  user-select: none;
}
:global(a) {
  display: inline-block;
  padding: 0;
  margin: 0;
  color: #fff;
  text-decoration: none;
  transition: 0.1s font-variation-settings, 0.1s padding-left;
}
:global(a[aria-current]) {
  font-variation-settings: 'wght' 300, 'slnt' -20;
  padding-left: 2rem;
}

:global(html) {
  width: 100%;
  height: 100%;
}
:global(body) {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
	background: #000;
	color: #fff;
  -webkit-tap-highlight-color: none;
	overscroll-behavior: contain;
	overflow: hidden;
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-variation-settings: 'wght' 300, 'slnt' 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
@media (prefers-color-scheme: dark) {
	:global(body) {
		background: #000;
		color: #fff;
	}
}

.logo {
	bottom: 1rem;
	right: 1rem;
	position: fixed;
  mix-blend-mode: exclusion;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
}
.logo svg {
  display: inline-block;
  float: left;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.35rem;
}
circle,
path {
	stroke: currentColor;
}

@media screen and (min-width: 768px) {
  :global(body) {
		cursor: pointer;
    font-size: 3rem;
	}
  :global(a[aria-current]) {
    padding-left: 2rem;
  }
  .logo svg {
    width: 3.5rem;
    height: 3.5rem;
    margin-left: 0.5rem;
  }
}
</style>
