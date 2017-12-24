<template>
    <vm-page v-nav="{title: 'Swiper'}">
        <vm-content padding class="outer-content SlidesPage">
            <h1>跑马灯组件</h1>
            <p>Slides组件是 <strong>Swiper插件</strong>
               的移植和拓展, Swiper初始化传递的属性对应Vue组件的props, Swiper属性中定义的钩子事件对应Vue组件的事件系统. 两者无缝对接, 使用上没有差异.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequuntur cumque earum exercitationem, id ipsa laboriosam laudantium magnam mollitia perferendis provident, quia quo recusandae reprehenderit saepe sunt totam vitae!</p>

            <h5>Default Setup</h5>
            <swiper>
              <swiper-slide>Slide 1</swiper-slide>
              <swiper-slide>Slide 2</swiper-slide>
              <swiper-slide>Slide 3</swiper-slide>
              <swiper-slide>Slide 4</swiper-slide>
              <swiper-slide>Slide 5</swiper-slide>
              <swiper-slide>Slide 6</swiper-slide>
              <swiper-slide>Slide 7</swiper-slide>
              <swiper-slide>Slide 8</swiper-slide>
              <swiper-slide>Slide 9</swiper-slide>
              <swiper-slide>Slide 10</swiper-slide>
            </swiper>

            <h5>Navigation<span>（按钮切换）</span></h5>
            <swiper :options="navigationOption">
              <swiper-slide>Slide 1</swiper-slide>
              <swiper-slide>Slide 2</swiper-slide>
              <swiper-slide>Slide 3</swiper-slide>
              <swiper-slide>Slide 4</swiper-slide>
              <swiper-slide>Slide 5</swiper-slide>
              <swiper-slide>Slide 6</swiper-slide>
              <swiper-slide>Slide 7</swiper-slide>
              <swiper-slide>Slide 8</swiper-slide>
              <swiper-slide>Slide 9</swiper-slide>
              <swiper-slide>Slide 10</swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>

            <h5>Pagination
              <span>（分页器 / 动态指示点）</span>
            </h5>
            <swiper :options="paginationOption">
              <swiper-slide>Slide 1</swiper-slide>
              <swiper-slide>Slide 2</swiper-slide>
              <swiper-slide>Slide 3</swiper-slide>
              <swiper-slide>Slide 4</swiper-slide>
              <swiper-slide>Slide 5</swiper-slide>
              <swiper-slide>Slide 6</swiper-slide>
              <swiper-slide>Slide 7</swiper-slide>
              <swiper-slide>Slide 8</swiper-slide>
              <swiper-slide>Slide 9</swiper-slide>
              <swiper-slide>Slide 10</swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

            <h5>Pagination / Dynamic Bullets
              <span>（分页器 / 动态指示点）</span>
            </h5>
            <swiper :options="paginationOption2">
              <swiper-slide>Slide 1</swiper-slide>
              <swiper-slide>Slide 2</swiper-slide>
              <swiper-slide>Slide 3</swiper-slide>
              <swiper-slide>Slide 4</swiper-slide>
              <swiper-slide>Slide 5</swiper-slide>
              <swiper-slide>Slide 6</swiper-slide>
              <swiper-slide>Slide 7</swiper-slide>
              <swiper-slide>Slide 8</swiper-slide>
              <swiper-slide>Slide 9</swiper-slide>
              <swiper-slide>Slide 10</swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

      <h5>Progress Pagination
        <span>（进度条指示器）</span>
      </h5>
      <!-- swiper -->
      <swiper :options="paginationOption3">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Fraction Pagination<span>（分式指示器）</span></h5>
      <swiper :options="paginationOption4">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Custom Pagination<span>（自定义指示器）</span></h5>
      <swiper :options="paginationOption5">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </swiper>

      <h5>Scrollbar<span>（滚动条）</span></h5>
      <swiper :options="scrollbarOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>

      <h5>Vertical Slider<span>（垂直切换）</span></h5>
      <swiper :options="verticalOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Space Between Slides<span>（在 Slides 之间设置间隙）</span></h5>
      <swiper :options="spaceBetweenOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Multiple Slides Per View<span>（一次显示多个 slides）</span></h5>
      <swiper :options="slidesPerViewOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Auto Slides Per View / Carousel Mode<span>（自定义 slide 宽度 / Carousel 模式）</span></h5>
      <swiper class="slides-per-view-auto" :options="slidesPerViewOption2">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Centered Slides<span>（Slides 居中）</span></h5>
      <swiper class="slides-cented" :options="slidesPerViewOption3">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Centered Slides + Auto Slides Per View<span>（Slides 居中 + 自适应）</span></h5>
      <swiper class="slides-cented" :options="slidesPerViewOption4">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Free Mode / No Fixed Positions<span>（free 模式 / 不贴合边缘）</span></h5>
      <swiper :options="slidesPerViewOption5">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Scroll Container<span>（内容滚动 / 可拖动）</span></h5>
      <swiper class="scrollbar-container" :options="scrollbarContainerOption">
        <swiper-slide class="text">
          <div class="content">
            <h4 class="title">乌合之众</h4>
            <p>回答这个问题之前，我想我们应该首先定义如何判断一本书存不存在偏见。我觉得“一本书是否存在偏见”并不在于他所提出的观点本身是否荒诞或者离经叛道，而在于他得出结论的过程是否科学，是否存在缺乏推敲的主观臆断。如果结论拥有完整严谨的推导过程，那么即使答案再令人瞠目结舌，我们也无法说他存在着偏见；反过来说，如果一本书里的论据没有任何可信的来源，结论也是无本之木，即使他的观点让人感觉“好像真是那么回事呀”，那么这套理论也很难摆脱主观思维的限制。</p>
            <p>以上是典型的理工思维。</p>
            <p>我从书架上找到了《乌合之众》戴光年的译本，随便翻开了几页：
              <blockquote> “又比如在亚洲一些野蛮人的部落中 流传着这样的风俗：当他们将骁勇善战的对手击败后，往往会吃下这个人的心脏，认为这样就可以得到他的全部力量和勇气。”（P61）
              “毫不客气的说，在十个人里面，就有九个人在几年里把他们的时间和努力浪费掉了；而且可以说，这是非常重要的，甚至是决定性的几年。他们中间有一半甚至三分之二的人，是为了考试而活着，然后被残酷地淘汰掉。”（P86）
              “就历史而言，尤其是文学和艺术的历史，实际上只是再重复那些毫无意义的东西。每个人都不想这样做，但是这些历史所具有的名望压迫着他们，每个人最后都会重复他从学校里学到的东西，直到这些东西变成了一些再没有人敢说三道四的称号和事物。”（P114）
              </blockquote>
            </p>
            <p>在这本书里我们经常可以看到勒庞把各种小说桥段，英雄传说和坊间流言用具有主观性的叙述方式表达出来，用以佐证他的论点，论证的逻辑方式也常常语焉不详——我可以接受这种书籍成为富有趣味性的人文读物，但是说这是一本研究群体心理学方面的重要著作，似乎令人难以接受。如果说《乌合之众》不存在偏见，我会觉得非常奇怪。</p>
            <br>
            <p>不过我们可以换一个角度看待勒庞和他的《乌合之众》。对于一部具有重要意义的作品来说，严谨和逻辑不应该作为其主要价值评判标准。我们应该关注的是它发现了什么，创造了什么。一部伟大的作品之所以伟大，并不是因为他严格的遵守着范式，而在于那些闪耀着的具有鲜明色调的个人智慧的光芒——这些东西通常是无法通过逻辑去解释的。从这个层面上说，我们其实并不需要执着于这本书是否存在着偏见，只需要让我们觉得“好像真是那么回事呀”就已经足够了。我没法说出这本书之于心理学的具体意义，但只说他带给我的东西，我觉得已经足够丰富。</p>
            <br>
            <p>而上面这些，似乎又是一种人文思维了。</p>
          </div>
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>

      <h5>Multi Row Slides Layout<span>（多行 Slides 分布）</span></h5>
      <swiper :options="multiRowOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Nested Swipers<span>（Swipers 嵌套）</span></h5>
      <swiper :options="swiperOptionh">
        <swiper-slide>Horizontal Slide 1</swiper-slide>
        <swiper-slide>
          <swiper :options="swiperOptionv">
            <swiper-slide>Vertical Slide 1</swiper-slide>
            <swiper-slide>Vertical Slide 2</swiper-slide>
            <swiper-slide>Vertical Slide 3</swiper-slide>
            <swiper-slide>Vertical Slide 4</swiper-slide>
            <swiper-slide>Vertical Slide 5</swiper-slide>
            <div class="swiper-pagination swiper-pagination-v" slot="pagination"></div>
          </swiper>
        </swiper-slide>
        <swiper-slide>Horizontal Slide 1</swiper-slide>
        <swiper-slide>Horizontal Slide 2</swiper-slide>
        <swiper-slide>Horizontal Slide 3</swiper-slide>
        <swiper-slide>Horizontal Slide 4</swiper-slide>
        <div class="swiper-pagination swiper-pagination-h" slot="pagination"></div>
      </swiper>

      <h5>Grab Cursor<span>（抓手光标）</span></h5>
      <swiper class="slides-cented" :options="grabCursorOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Infinite Loop<span>（无限循环模式）</span></h5>
      <swiper :options="infiniteLoopOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Loop Mode with Multiple Slides Per Group<span>（Loop 模式 + Slides 分组）</span></h5>
      <swiper :options="infiniteLoopOption2">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Fade Effect<span>（渐变切换）</span></h5>
      <swiper :options="effectFadeOption">
        <swiper-slide class="slide-1"></swiper-slide>
        <swiper-slide class="slide-2"></swiper-slide>
        <swiper-slide class="slide-3"></swiper-slide>
        <swiper-slide class="slide-4"></swiper-slide>
        <swiper-slide class="slide-5"></swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>

      <h5>3D Cube Effect<span>（3D方块效果）</span></h5>
      <swiper class="effect-cube" :options="effectCubeOption">
        <swiper-slide class="slide-1"></swiper-slide>
        <swiper-slide class="slide-2"></swiper-slide>
        <swiper-slide class="slide-3"></swiper-slide>
        <swiper-slide class="slide-4"></swiper-slide>
        <swiper-slide class="slide-5"></swiper-slide>
        <swiper-slide class="slide-6"></swiper-slide>
        <swiper-slide class="slide-7"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>3D Coverflow Effect<span>（3D滚动切换）</span></h5>
      <swiper class="effect-cube" :options="effectCoverflowOption">
        <swiper-slide class="slide-1"></swiper-slide>
        <swiper-slide class="slide-2"></swiper-slide>
        <swiper-slide class="slide-3"></swiper-slide>
        <swiper-slide class="slide-4"></swiper-slide>
        <swiper-slide class="slide-5"></swiper-slide>
        <swiper-slide class="slide-6"></swiper-slide>
        <swiper-slide class="slide-7"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>3D Flip Effect<span>（3D翻转切换）</span></h5>
      <swiper class="effect-flip" :options="effectFlipOption">
        <swiper-slide class="slide-1"></swiper-slide>
        <swiper-slide class="slide-2"></swiper-slide>
        <swiper-slide class="slide-3"></swiper-slide>
        <swiper-slide class="slide-4"></swiper-slide>
        <swiper-slide class="slide-5"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Autoplay<span>（自动切换）</span></h5>
      <swiper class="effect-flip" :options="autoplayOption">
        <swiper-slide class="slide-1"></swiper-slide>
        <swiper-slide class="slide-2"></swiper-slide>
        <swiper-slide class="slide-3"></swiper-slide>
        <swiper-slide class="slide-4"></swiper-slide>
        <swiper-slide class="slide-5"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Dynamic Slides<span>（动态加载 Slides）</span></h5>
      <vm-row>
        <vm-button @click.native="prependSlide" small>Prepend Slide</vm-button>
        <vm-button @click.native="appendSlide" small>Append Slide</vm-button>
        <vm-button @click.native="popSlide" small>Pop Slide</vm-button>
        <vm-button @click.native="shiftSlide" small>Shift Slide</vm-button>
      </vm-row>
      <swiper :options="dynamicSlidesOption">
        <swiper-slide v-for="slide in swiperSlides" :key="slide">Slide {{ slide }}</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Thumbs Gallery With Two-way Control<span>（缩略图控制）</span></h5>
      <div style="height: 240px">
        <swiper :options="swiperOptionThumbs1" class="thumb gallery-top" ref="swiperTop">
          <swiper-slide class="slide-1">slide-1</swiper-slide>
          <swiper-slide class="slide-2">slide-2</swiper-slide>
          <swiper-slide class="slide-3">slide-3</swiper-slide>
          <swiper-slide class="slide-4">slide-4</swiper-slide>
          <swiper-slide class="slide-5">slide-5</swiper-slide>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper :options="swiperOptionThumbs2" class="thumb gallery-thumbs" ref="swiperThumbs">
          <swiper-slide class="slide-1">slide-1</swiper-slide>
          <swiper-slide class="slide-2">slide-2</swiper-slide>
          <swiper-slide class="slide-3">slide-3</swiper-slide>
          <swiper-slide class="slide-4">slide-4</swiper-slide>
          <swiper-slide class="slide-5">slide-5</swiper-slide>
        </swiper>
      </div>

      <h5>RTL Layout<span>（rtl 布局 / 从右到左）</span></h5>
      <swiper :options="rtlswiperOption" dir="rtl">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Parallax<span>（视差效果）</span></h5>
      <swiper class="parallax" :options="parallaxOption">
        <div class="parallax-bg" slot="parallax-bg" data-swiper-parallax="-23%"></div>
        <swiper-slide>
          <div class="title" data-swiper-parallax="-100">Slide 1</div>
          <br>
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div class="text" data-swiper-parallax="-300">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="title" data-swiper-parallax="-100">Slide 2</div>
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div class="text" data-swiper-parallax="-300">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="title" data-swiper-parallax="-100">Slide 3</div>
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div class="text" data-swiper-parallax="-300">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>

      <h5>Lazy Loading Images<span>（图片延迟加载）</span></h5>
      <swiper class="lazy" :options="lazyLoadingOption">
        <swiper-slide>
          <img data-src="http://lorempixel.com/1600/1200/nature/1" class="swiper-lazy">
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
        <swiper-slide>
            <img data-src="http://lorempixel.com/1600/1200/nature/2" class="swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
        <swiper-slide>
          <img data-src="http://lorempixel.com/1600/1200/nature/3" class="swiper-lazy">
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
        <swiper-slide>
          <img data-src="http://lorempixel.com/1600/1200/nature/4" class="swiper-lazy">
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
        <swiper-slide>
          <img data-src="http://lorempixel.com/1600/1200/nature/5" class="swiper-lazy">
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper>

      <h5>Responsive Breakpoints<span>（响应式设置 / 根据屏幕大小自动分割幻灯单位）</span></h5>
      <swiper :options="responsiveOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <h5>Auto Height<span>（高度自适应）</span></h5>
      <swiper class="auto-height" :options="autoHeightOption" style="height: auto">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Zoom<span>（变焦、点击放大）</span></h5>
      <swiper :options="zoomOption">
        <swiper-slide>
          <div class="swiper-zoom-container">
            <img src="../../static/background/6.jpg">
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiper-zoom-container">
            <img src="../../static/background/1.jpg">
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiper-zoom-container">
            <img src="../../static/background/3.jpg">
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <h5>Virtual Slides<span>（虚拟 Slides）</span></h5>
      <div>
        <vm-button @click.native="toSlide(0)" small>To Slide 1</vm-button>
        <vm-button @click.native="toSlide(249)" small>To Slide 250</vm-button>
        <vm-button @click.native="toSlide(499)" small>To Slide 500</vm-button>
      </div>
      <swiper :options="virtualOption" ref="mySwiper">
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

        </vm-content>
    </vm-page>
</template>

<script type="text/javascript">
import { Swiper, SwiperSlide } from 'vimon'
export default {
  name: 'SwiperDemo',
  components: {
    'swiper': Swiper,
    'swiper-slide': SwiperSlide
  },
  data () {
    return {
      navigationOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      paginationOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },

      paginationOption2: {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      },

      paginationOption3: {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      paginationOption4: {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      paginationOption5: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet (index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
          }
        }
      },

      scrollbarOption: {
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        }
      },

      verticalOption: {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      spaceBetweenOption: {
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      slidesPerViewOption: {
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      slidesPerViewOption2: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      slidesPerViewOption3: {
        slidesPerView: 4,
        spaceBetween: 10,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      slidesPerViewOption4: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      slidesPerViewOption5: {
        slidesPerView: 3,
        spaceBetween: 10,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      scrollbarContainerOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true
      },

      multiRowOption: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      swiperOptionh: {
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination-h',
          clickable: true
        }
      },
      swiperOptionv: {
        direction: 'vertical',
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination-v',
          clickable: true
        }
      },

      grabCursorOption: {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 10,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },

      infiniteLoopOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      infiniteLoopOption2: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      effectFadeOption: {
        spaceBetween: 10,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      effectCubeOption: {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },

      effectCoverflowOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },

      effectFlipOption: {
        effect: 'flip',
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      autoplayOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      dynamicSlidesOption: {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperSlides: [1, 2, 3, 4, 5],

      swiperOptionThumbs1: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, // looped swiper should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs2: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, // looped swiper should be the same
        slideToClickedSlide: true
      },

      rtlswiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      parallaxOption: {
        speed: 600,
        parallax: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      lazyLoadingOption: {
        // Enable lazy loading
        lazy: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      responsiveOption: {
        slidesPerView: 5,
        spaceBetween: 50,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },

      autoHeightOption: {
        autoHeight: true, // enable auto height
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      zoomOption: {
        zoom: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      virtualOption: {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        virtual: {
          slides: (function () {
            const slides = []
            for (let i = 0; i < 600; i += 1) {
              slides.push('Slide ' + (i + 1))
            }
            return slides
          }())
        }
      }

    }
  },
  mounted () {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      if (swiperTop && swiperThumbs) {
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      }
    })
  },
  methods: {
    appendSlide () {
      this.swiperSlides.push(this.swiperSlides.length + 1)
    },
    prependSlide () {
      this.swiperSlides.unshift(this.swiperSlides[0] - 1)
    },
    popSlide () {
      this.swiperSlides.pop()
    },
    shiftSlide () {
      this.swiperSlides.shift()
    },
    toSlide (i) {
      this.$refs.mySwiper.swiper.slideTo(i, 0)
    }
  }
}
</script>

<style scoped lang="scss">
.SlidesPage {
  .box {
    height: 240px;
  }
  h5 span {
    font-size:1.5rem
  }
  .swiper-container {
    width: 100%;
    height: 200px;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;

    &.slide-1 {
        background-image:url('../../static/background/1.jpg');
      }

      &.slide-2 {
        background-image:url('../../static/background/2.jpg');
      }

      &.slide-3 {
        background-image:url('../../static/background/3.jpg');
      }

      &.slide-4 {
        background-image:url('../../static/background/4.jpg');
      }

      &.slide-5 {
        background-image:url('../../static/background/5.jpg');
      }
  }

  .slides-per-view-auto {
    .swiper-slide {
      width: 80%;
    }
    .swiper-slide:nth-child(2n) {
      width: 60%;
    }
    .swiper-slide:nth-child(3n) {
      width: 40%;
    }
  }

  .slides-cented {
    .swiper-slide {
      width: 60%;
    }
    .swiper-slide:nth-child(2n) {
        width: 40%;
    }
    .swiper-slide:nth-child(3n) {
        width: 20%;
    }
  }

  .scrollbar-container {
    .swiper-slide.text {
      font-size: 18px!important;
      text-align: left!important;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 30px;

      > .content {

        > .title {
          margin: 0;
          text-align: center;
          margin-bottom: .75em;
        }

        > p,
        blockquote {
          line-height: 2;
          text-indent: 2em;
        }

        blockquote {
          background-color: #ddd;
          margin-left: 2em;
        }
      }
    }
  }

  .effect-cube {
    .swiper-inner {
      position: relative;
      overflow: hidden;
      height: 330px;
      padding: 15px;
    }
    .swiper-container {
      width: 300px!important;
      height: 300px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -150px;
      margin-top: -150px;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
    }
  }

  .effect-flip {
    .swiper-container {
      width: 300px!important;
      padding: 50px!important;
    }
    .swiper-slide {
      background-position: 50%!important;
      background-size: cover!important;
      width: 100%!important;
    }
  }


  .thumb {
    .swiper-container {
      background-color: #000;
    }
    .swiper-slide {
      background-size: cover;
      background-position: center;
    }
  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%!important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

  .parallax {
    .swiper-slide {
      font-size: 18px;
      color:#fff;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 40px 60px;
      background-color: transparent!important;
      justify-content: space-around!important;
    }
    .parallax-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 130%;
      height: 100%;
      -webkit-background-size: cover;
      background-size: cover;
      background-position: center;
      background-image: url(../../static/background/2.jpg);
    }
    .swiper-slide .title {
      font-size: 41px;
      font-weight: 300;
    }
    .swiper-slide .subtitle {
      font-size: 21px;
    }
    .swiper-slide .text {
      font-size: 14px;
      max-width: 400px;
      line-height: 1.3;
    }
  }

  .lazy {
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #444!important;
    }
    .swiper-slide img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      -ms-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  .auto-height {
    .swiper-slide {
      height: 200px;
      line-height: 200px;
    }
    .swiper-slide:nth-child(2n) {
      height: 300px;
      line-height: 300px;
    }
  }
}
</style>
