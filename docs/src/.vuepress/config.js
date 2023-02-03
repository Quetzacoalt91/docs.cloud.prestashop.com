const { description } = require('../../package')

module.exports = {
  title: 'Prestashop Integration Framework',
  description: '',
  theme: '',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
   head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/images/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/images/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/images/favicons/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/assets/images/favicons/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/assets/images/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    ['link', { rel: "shortcut icon", href: "/assets/images/favicons/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#011638"}],
    ['meta', { name: "msapplication-config", content: "/assets/images/favicons/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#011638"}],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    displayAllHeaders: true,
    sidebarDepth: 1,
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Standard Module Development References',
        ariaLabel: 'Standard Module Development References',
        items: [
          { text: 'PrestaShop Technical Documentation', link: 'https://devdocs.prestashop-project.org/' },
          { text: 'Module Generator', link: 'https://validator.prestashop.com/generator' }
        ]
      },
      { text: 'PrestaShop User Documentation', link: 'https://docs.prestashop-project.org/welcome/' },
      { text: 'Sample Module Repository', link: 'https://github.com/PrestaShopCorp/partner-devtools.prestashop.com/tree/main/modules/rbm_example' }
    ],
    sidebar: [
      [ '/' ,'Home' ],
      [ '/0-introduction/', 'Introduction' ],
      [ '/1-how-it-works/', 'How It Works' ],
      [ '/2-preparing-your-environment/', 'Preparing Your Environment' ],
      [ '/3-prestashop-account/', 'Integrating PrestaShop Account' ],
      [ '/4-account-and-billing/', 'Integrating PrestaShop Account and Billing'],
      [ '/5-prestashop-cloudsync/', 'Integrating PrestaShop CloudSync'],
      [ '/6-webhook-events/', 'Webhook Events'],
      [ '/7-billing-api/', 'Billing API' ],
      [ '/8-faq/', 'FAQ' ]
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}