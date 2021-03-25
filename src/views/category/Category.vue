<template>
    <div id="wrapper">
    <ul>
      <li>ass1</li>
      <li>ass2</li>
      <li>ass3</li>
      <li>ass4</li>
      <li>ass5</li>
      <li>ass6</li>
      <li>ass7</li>
      <li>ass8</li>
      <li>ass9</li>
      <li>ass10</li>
      <li>ass11</li>
      <li>ass12</li>
      <li>ass13</li>
      <li>ass14</li>
      <li>ass15</li>
      <li>ass16</li>
      <li>ass17</li>
      <li>ass18</li>
      <li>ass19</li>
      <li>ass20</li>
      <li>ass21</li>
      <li>ass22</li>
      <li>ass23</li>
      <li>ass24</li>
      <li>ass25</li>
      <li>ass26</li>
      <li>ass27</li>
      <li>ass28</li>
      <li>ass29</li>
      <li>ass30</li>
      <li>ass31</li>
      <li>ass32</li>
      <li>ass33</li>
      <li>ass34</li>
      <li>ass35</li>
      <li>ass36</li>
      <li>ass37</li>
      <li>ass38</li>
      <li>ass39</li>
      <li>ass40</li>
      <li>ass41</li>
      <li>ass42</li>
      <li>ass43</li>
      <li>ass44</li>
      <li>ass45</li>
      <li>ass46</li>
      <li>ass47</li>
      <li>ass48</li>
      <li>ass49</li>
      <li>ass50</li>
      <li>ass51</li>
      <li>ass52</li>
      <li>ass53</li>
      <li>ass54</li>
      <li>ass55</li>
      <li>ass56</li>
      <li>ass57</li>
      <li>ass58</li>
      <li>ass59</li>
      <li>ass60</li>
      <li>ass61</li>
      <li>ass62</li>
      <li>ass63</li>
      <li>ass64</li>
      <li>ass65</li>
      <li>ass66</li>
      <li>ass67</li>
      <li>ass68</li>
      <li>ass69</li>
      <li>ass70</li>
      <li>ass71</li>
      <li>ass72</li>
      <li>ass73</li>
      <li>ass74</li>
      <li>ass75</li>
      <li>ass76</li>
      <li>ass77</li>
      <li>ass78</li>
      <li>ass79</li>
      <li>ass80</li>
      <li>ass81</li>
      <li>ass82</li>
      <li>ass83</li>
      <li>ass84</li>
      <li>ass85</li>
      <li>ass86</li>
      <li>ass87</li>
      <li>ass88</li>
      <li>ass89</li>
      <li>ass90</li>
      <li>ass91</li>
      <li>ass92</li>
      <li>ass93</li>
      <li>ass94</li>
      <li>ass95</li>
      <li>ass96</li>
      <li>ass97</li>
      <li>ass98</li>
      <li>ass99</li>
      <li>ass100</li>

    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        // bscroll: null
      }
    },
   
    mounted() {
      const bscroll = new BScroll(document.querySelector('#wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      bscroll.on('scroll',(position) => {
        console.log(position);
      })
      bscroll.on('pullingUp', () => {
        console.log('上拉加载');
      })
    },
  }
</script>

<style scoped>
  #wrapper {
    height: 200px;
    background-color:red;
    overflow: hidden;
  }
</style>