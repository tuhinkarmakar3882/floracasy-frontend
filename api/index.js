import express from 'express'

// Create express router
const router = express.Router()

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/getBlogData', (req, res) => {
  console.log(req.query)
  const body = `<h1>Now its easy to take care your underarms at home</h1><p class="ql-align-center">Hello People!</p><blockquote>We usually take care of our skin, body &amp; hair. Although we pamper ourselves but generally tend to forget to take care of our other body parts, that can cause troubles in the long run if not taken proper care. One such example will be - underarms. As the underarms' skin is highly sensitive, it's not a good deal to ignore its problems.</blockquote><h4>Today, we shall together try to find out what are the main reasons behind underarms problems.</h4><p><br></p><p>Glands that are situated on our armpit, don't start working until puberty. And that's the time when we usually start to notice body odor. While this is normal, some people tend to sweat more than usual. This condition is called <a href="Hyperhidrosis" rel="noopener noreferrer" target="_blank"><strong>Hyperhidrosis</strong></a>. People with hyperhidrosis sweat excessively, especially from their armpits.</p><p><br></p><p>When blackness appears in our underarms, we may lose our confidence. We fear to wear backless or sleeveless clothes. Right?</p><blockquote>Now no need to worry, I will help you as always because after all, we are a happy community. It's not only your problem alone, but it's also our concern &amp; we will solve it together, Okay?.</blockquote><p><br></p><h4>Let's Start</h4><p>First Let's find out the actual reason behind these armpit problems.</p><p><br></p><h4>Why the underarms' skin is so sensitive?</h4><p>Your armpit is a sensitive area containing nerves, blood vessels, and lymph nodes. So it's not uncommon to experience discomfort and pain in the left armpit. This pain can range from mild to severe and is often the result of an infection, inflammation, or irritation.</p><p><br></p><h4>Problems that generally occurs in our armpit</h4><p>A condition in which moist, warm skin becomes irritated and often mildly infected. Redness, itching, and burning of the skin in the armpits are common symptoms of intertrigo.</p><p><br></p><p><strong>Armpit abscess:</strong></p><ul><li>When an infected fluid (pus) collects in the armpit. The bacteria Staphylococcus is the most common cause.</li></ul><h4>Causes behind Darkness</h4><p>Dark underarms usually aren't a sign of anything serious, but some people may find them embarrassing — especially during tank top and swimsuit season. Darkening is often due to a skin condition called acanthosis nigricans (AN). It causes the skin to thicken and darken in folds around the body.</p><h4>Reasons behind the Bad smell</h4><p>Smelly armpits may make you self-conscious, even though this is a problem most people have dealt with before. Commonly known as body odor (BO) and technically as **Bromhidrosis**, malodorous armpits usually don’t cause for concern.</p><p><br></p><p>Your body is covered with sweat glands because sweating is an essential function that helps us cool down.</p><p><br></p><p>There are two main kinds of sweat glands:</p><ul><li>Eccrine</li><li>Apocrine</li></ul><p>Eccrine glands cover much of your body and open directly on the skin’s surface.</p><p><br></p><p>By contrast, apocrine glands occur in areas that contain a lot of hair follicles, like the groin and armpit. Instead of opening up to the surface of the skin, apocrine glands empty into the hair follicle and then open up to the surface.</p><p><br></p><h4>Feeling pain in your underarms! But why?</h4><p>Your armpit pain could be brought on by something temporary, or it could be a warning sign for a more serious condition.</p><p><br></p><p>These are some common causes for armpit pain:</p><ul><li>Muscle strain</li><li>Skin Conditions&nbsp;( like waxy skin )</li><li>Shingles</li><li>Swollen lymph nodes</li></ul><p><br></p><h4>Now that we have built a common ground knowledge, Let's talk about the solutions.</h4><ul><li>First, we need to remove armpit hairs with the help of hair removing clean &amp; tools </li></ul><pre class="ql-syntax" spellcheck="false">Do you want a blog on it? Let me know
</pre><h4>Darkness, redness, Bad odor removing treatment</h4><p><br></p><h5>1. Exfoliation</h5><p>Exfoliation helps to remove blackheads &amp; whiteheads &amp; improve blood circulation so that your underarms look more clean &amp; bright.</p><ul><li>First, take a bowl &amp; add 1 tablespoon sugar in it according to your need.</li><li>Add 2 tablespoon orange peel of powder &amp; some drops of coconut oil in it.</li><li>Mix it very well and apply gently in your armpits</li></ul><p><br></p><h5>2. Use a Mask</h5><p>If you have dry &amp; pigmented underarms then do try this mask to remove all pigmentation &amp; dryness. It provides a good texture to your underarms.</p><p><br></p><p>To prepare this mask you need only 3 ingredients, which is easily available in your kitchen.</p><ul><li>One &amp; half tablespoon of Gram flour</li><li>Half teaspoon of Turmeric</li><li>Few drops of Lemon juice</li></ul><p>Take all the above ingredients in a bowl &amp; mix well. Apply in your armpit, keep it for 10 min and rinse off with water.</p><p><br></p><p>Apply an aloe vera gel &amp; roll on in armpit.&nbsp;You are done with clean, smooth spotless underarms.</p><p><br></p><h4>Don't forget to share your experience with me</h4><p>Hope the above tips will help you. Take care and stay safe &amp; healthy &amp; I'll catch you in the next one.</p>`
  const blogsData = [
    {
      id: 0,
      title: 'Love your hair but suffering from Hair fall or hair damage?',
      timestamp: 'Mon 13th Nov, 2018, 12:30 P.M.',
      author: 'Jammie Johnson',
      category: 'Beauty & Makeup',
      image: 'https://picsum.photos/249',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
    {
      id: 1,
      title: 'That Great Apple iPhone Review',
      timestamp: 'Mon 12th Nov, 2018, 01:30 P.M.',
      author: 'Annie Parker',
      category: 'Technology',
      image: 'https://picsum.photos/251',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
  ]
  const requestedBlogId = 0 // req.query.id
  const response = { ...blogsData[requestedBlogId], body }
  res.json({ response })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router,
}
