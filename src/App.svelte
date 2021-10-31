<script>
  import { tick, onMount } from 'svelte'
  import { Router, Route, Link, navigate } from 'svelte-routing'
  import Nav from './components/Nav.svelte'
  import Tools from './components/Tools.svelte'
  import Logo from './components/Logo.svelte'

  import Stamps from './sketches/stamps/index.svelte'
  import Swirls from './sketches/swirls/index.svelte'
  import Warp from './sketches/warp/index.svelte'
  import Frames from './sketches/frames/index.svelte'

  const sketches = [
    { name: 'Swirls', component: Swirls },
    { name: 'Warp',   component: Warp },
    { name: 'Stamps', component: Stamps },
  ]

  let current
  let url

  const refresh = async () => {
    const curUrl = window.location.pathname
    navigate('/refresh')
    await tick()
    navigate(curUrl)
  }
  const onContextMenu = ev => {
    ev.preventDefault()
    ev.stopPropagation()
    return false
  }

  onMount(() => {
    window.addEventListener('contextmenu', onContextMenu)
  })

</script>

<Router {url}>

  <main>
    <Route path="/"><Frames bind:this={current}/></Route>
    <Route path="frames"><Frames bind:this={current}/></Route>
    {#each sketches as sketch}
      <Route path={`sketch/${sketch.name.toLowerCase()}`}>
        <svelte:component this={sketch.component} bind:this={current}/>
      </Route>
    {/each}
  </main>

  <Nav {sketches} />

  <Tools
    {current}
    on:refresh={current.refresh || refresh}
    on:clear={current.clear}
    on:prevFrame={current.prev}
    on:nextFrame={current.next}
  />

  <Logo />

</Router>
