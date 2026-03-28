import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE'

const PARTS = [
  {
    id: 'wheels',
    imagePrompt: 'Cute colorful cartoon illustration of car wheels/tires for a children educational app. 3D cartoon style, bright orange color, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي العجلات يا حبيبي! العربية عندها أربع عجلات كبار عشان تمشي على الأرض. العجلات بتلف وبتلف بسرعة عشان العربية تتحرك وتوصلنا لأي مكان نحبه. من غير العجلات العربية مش هتعرف تتحرك خالص!',
  },
  {
    id: 'engine',
    imagePrompt: 'Cute colorful cartoon illustration of a car engine for a children educational app. 3D cartoon style, bright red color, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'ده المحرك يا بطل! ده قلب العربية. زي ما قلبك بينبض وبيخليك تجري وتلعب، المحرك بيشتغل وبيخلي العربية تمشي. المحرك بياخد بنزين وبيحوله لقوة عشان العجلات تلف!',
  },
  {
    id: 'steering',
    imagePrompt: 'Cute colorful cartoon illustration of a car steering wheel for a children educational app. 3D cartoon style, bright yellow color, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'ده الدركسيون يا حبيبي! لما بابا أو ماما عايزين يخشوا يمين بيلفوا الدركسيون يمين، ولما عايزين يخشوا شمال بيلفوه شمال. الدركسيون هو اللي بيوجه العربية وبيخليها تروح في الاتجاه الصح!',
  },
  {
    id: 'doors',
    imagePrompt: 'Cute colorful cartoon illustration of a car door for a children educational app. 3D cartoon style, bright blue color, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي الأبواب يا صغير! كل عربية عندها أبواب عشان الناس تركب وتنزل. لما بابا بيفتح الباب بتركب جوا العربية وتقعد على الكرسي وتحط حزام الأمان. الأبواب كمان بتحميك وأنت جوا العربية!',
  },
  {
    id: 'windows',
    imagePrompt: 'Cute colorful cartoon illustration of car windows/glass for a children educational app. 3D cartoon style, bright cyan color, transparent glass look, friendly and fun, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي الشبابيك يا عسل! الشبابيك مصنوعة من إزاز شفاف عشان تقدر تبص منها وتشوف الشجر والناس والبيوت وأنت جوا العربية. وكمان ممكن تفتح الشباك عشان الهوا الحلو يدخل!',
  },
  {
    id: 'body',
    imagePrompt: 'Cute colorful cartoon illustration of a car body/chassis/frame for a children educational app. 3D cartoon style, bright green color, showing the outer shell of a car, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'ده جسم العربية يا بطل! ده الهيكل الكبير اللي بيغطي كل حاجة جوا العربية وبيحميها. زي ما البيت بيحميك من المطر والشمس، جسم العربية بيحمي المحرك والكراسي وكل الأجزاء التانية!',
  },
  {
    id: 'headlights',
    imagePrompt: 'Cute colorful cartoon illustration of car headlights for a children educational app. 3D cartoon style, bright golden yellow color with light beams, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي الكشافات يا حبيبي! لما الدنيا بتبقى ضلمة بالليل، بابا بيولع الكشافات عشان تنور الطريق قدام العربية. كده بيشوف الطريق كويس ويسوق بأمان. الكشافات زي الكشاف اللي بتنور بيه في البيت!',
  },
  {
    id: 'seats',
    imagePrompt: 'Cute colorful cartoon illustration of car seats for a children educational app. 3D cartoon style, bright purple color, comfortable looking car seats, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي الكراسي يا صغير! جوا العربية في كراسي مريحة عشان كل واحد يقعد عليها. في كرسي لبابا اللي بيسوق، وكرسي لماما جنبه، وكراسي ورا ليك وللعيلة. وأهم حاجة تحط حزام الأمان دايماً!',
  },
  {
    id: 'brakes',
    imagePrompt: 'Cute colorful cartoon illustration of car brakes/brake disc for a children educational app. 3D cartoon style, bright pink color, simple brake disc design, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي الفرامل يا بطل! لما بابا عايز يوقف العربية بيدوس على الفرامل. الفرامل بتمسك في العجلات وبتخلي العربية تقف. الفرامل مهمة جداً عشان العربية توقف قبل إشارة المرور أو لما حد يعدي الشارع!',
  },
  {
    id: 'trunk',
    imagePrompt: 'Cute colorful cartoon illustration of a car trunk/boot open for a children educational app. 3D cartoon style, bright teal color, open trunk showing storage space, friendly and fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي شنطة العربية يا حبيبي! دي في ضهر العربية من ورا. لما بنسافر أو بنروح مكان بنفتحها ونحط فيها الشنط والأكل والحاجات بتاعتنا. شنطة العربية واسعة وبتشيل حاجات كتير!',
  },
]

const RC_PARTS = [
  {
    id: 'rc-body',
    imagePrompt: 'Cute colorful cartoon illustration of a small RC remote control car body shell for a children educational app. Bright pink/magenta plastic body, 3D cartoon style, fun racing look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'ده جسم عربية الريموت كونترول يا حبيبي! شايف إزاي هو صغير وخفيف؟ جسم عربية الريموت مصنوع من بلاستيك خفيف مش زي العربية الكبيرة اللي مصنوعة من حديد. عشان كده بتبقى خفيفة وسريعة!',
  },
  {
    id: 'rc-wheels',
    imagePrompt: 'Cute colorful cartoon illustration of small RC car rubber wheels for a children educational app. Orange hub caps, small rubber tires, 3D cartoon style, fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي عجلات عربية الريموت يا بطل! هي صغيرة بس بتلف بسرعة جداً. العجلات دي من كاوتش عشان تمسك في الأرض كويس والعربية ماتزحلقش!',
  },
  {
    id: 'rc-motor',
    imagePrompt: 'Cute colorful cartoon illustration of a small electric motor for RC car for a children educational app. Bright orange/red cylindrical motor with wires, 3D cartoon style, fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'ده الموتور الكهربائي يا حبيبي! ده مختلف عن محرك العربية الكبيرة. المحرك الكبير بيشتغل بالبنزين، لكن ده بيشتغل بالكهرباء من البطارية! بيلف بسرعة جداً عشان يحرك العجلات!',
  },
  {
    id: 'rc-battery',
    imagePrompt: 'Cute colorful cartoon illustration of a rechargeable battery pack for RC car for a children educational app. Bright green battery with power indicator, 3D cartoon style, fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي البطارية يا صغير! البطارية هي اللي بتدي الكهرباء للموتور عشان يشتغل. لما البطارية بتخلص العربية بتقف، وبعدين بنشحنها بالشاحن زي ما بنشحن التابلت وبترجع تشتغل تاني!',
  },
  {
    id: 'rc-circuit',
    imagePrompt: 'Cute colorful cartoon illustration of a green circuit board PCB for RC car for a children educational app. Green board with colorful electronic components and chips, 3D cartoon style, fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي دايرة التحكم يا بطل! دي مخ العربية! فيها رقائق إلكترونية صغيرة بتفهم الأوامر اللي بتيجي من الريموت. لما بتضغط يمين على الريموت، الدايرة بتقول للموتور لف يمين!',
  },
  {
    id: 'rc-remote',
    imagePrompt: 'Cute colorful cartoon illustration of a handheld RC car remote controller for a children educational app. Blue remote with joysticks and colorful buttons, 3D cartoon style, fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'ده الريموت كونترول يا حبيبي! ده اللي بنمسكه بإيدنا ونتحكم في العربية. فيه عصايتين صغيرين وأزرار. لما بنضغط لقدام العربية بتمشي لقدام، ولما بنضغط يمين بتلف يمين! زي السحر!',
  },
  {
    id: 'rc-antenna',
    imagePrompt: 'Cute colorful cartoon illustration of an antenna for RC car for a children educational app. Purple thin antenna rod with glowing tip and signal waves, 3D cartoon style, fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي الأنتينا يا عسل! الأنتينا هي اللي بتستقبل الإشارات من الريموت. لما بتضغط على الريموت، بيبعت إشارة في الهوا زي الموجات، والأنتينا بتلتقطها وبتبعتها لدايرة التحكم عشان تعرف تعمل إيه!',
  },
  {
    id: 'rc-lights',
    imagePrompt: 'Cute colorful cartoon illustration of small LED lights for RC car for a children educational app. Bright yellow and red LED bulbs glowing, 3D cartoon style, fun look, simple design suitable for 6 year old kids, white clean background, high quality illustration',
    narrationText: 'دي لمبات LED يا بطل! LED دي لمبات صغيرة أوي بس بتنور جامد! في عربية الريموت بنحط لمبات LED في الأمام والورا عشان تدي شكل حلو وعشان نشوف العربية لو بنلعب بيها بالليل!',
  },
]

const EXTRA_NARRATIONS = [
  {
    id: 'welcome',
    text: 'أهلاً يا حبيبي! يلا نتعلم مع بعض أجزاء العربية! اضغط على أي جزء عشان تعرف عنه حاجات حلوة!',
  },
  {
    id: 'complete',
    text: 'برافو عليك يا بطل! أنت اتعلمت كل أجزاء العربية! أنت شاطر جداً! يلا نلعب تاني!',
  },
]

function createWavHeader(pcmDataLength, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8)
  const blockAlign = numChannels * (bitsPerSample / 8)
  const dataChunkSize = pcmDataLength
  const fileSize = 36 + dataChunkSize

  const header = Buffer.alloc(44)
  header.write('RIFF', 0)
  header.writeUInt32LE(fileSize, 4)
  header.write('WAVE', 8)
  header.write('fmt ', 12)
  header.writeUInt32LE(16, 16) // fmt chunk size
  header.writeUInt16LE(1, 20) // PCM format
  header.writeUInt16LE(numChannels, 22)
  header.writeUInt32LE(sampleRate, 24)
  header.writeUInt32LE(byteRate, 28)
  header.writeUInt16LE(blockAlign, 32)
  header.writeUInt16LE(bitsPerSample, 34)
  header.write('data', 36)
  header.writeUInt32LE(dataChunkSize, 40)

  return header
}

const imagesDir = path.join(__dirname, '..', 'public', 'assets', 'images')
const audioDir = path.join(__dirname, '..', 'public', 'assets', 'audio')

fs.mkdirSync(imagesDir, { recursive: true })
fs.mkdirSync(audioDir, { recursive: true })

async function generateImage(partId, prompt) {
  const outputPath = path.join(imagesDir, `${partId}.png`)
  if (fs.existsSync(outputPath)) {
    console.log(`  [SKIP] Image already exists: ${partId}.png`)
    return
  }

  console.log(`  [IMG] Generating image for: ${partId}...`)
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error(`  [ERR] Image API error for ${partId}:`, JSON.stringify(data).slice(0, 200))
      return
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64')
        fs.writeFileSync(outputPath, buffer)
        console.log(`  [OK] Saved image: ${partId}.png (${(buffer.length / 1024).toFixed(1)}KB)`)
        return
      }
    }
    console.error(`  [ERR] No image data in response for ${partId}`)
  } catch (err) {
    console.error(`  [ERR] Image generation failed for ${partId}:`, err.message)
  }
}

async function generateAudio(id, text) {
  const outputPath = path.join(audioDir, `${id}.wav`)
  if (fs.existsSync(outputPath)) {
    console.log(`  [SKIP] Audio already exists: ${id}.wav`)
    return
  }

  // Also remove old .mp3 files
  const oldMp3 = path.join(audioDir, `${id}.mp3`)
  if (fs.existsSync(oldMp3)) fs.unlinkSync(oldMp3)

  console.log(`  [TTS] Generating audio for: ${id}...`)
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Zephyr',
                },
              },
            },
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error(`  [ERR] TTS API error for ${id}:`, JSON.stringify(data).slice(0, 200))
      return
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData) {
        const pcmBuffer = Buffer.from(part.inlineData.data, 'base64')
        // Wrap raw PCM L16 24kHz mono in a WAV header
        const wavHeader = createWavHeader(pcmBuffer.length, 24000, 1, 16)
        const wavBuffer = Buffer.concat([wavHeader, pcmBuffer])
        fs.writeFileSync(outputPath, wavBuffer)
        console.log(`  [OK] Saved audio: ${id}.wav (${(wavBuffer.length / 1024).toFixed(1)}KB)`)
        return
      }
    }
    console.error(`  [ERR] No audio data in response for ${id}`)
  } catch (err) {
    console.error(`  [ERR] Audio generation failed for ${id}:`, err.message)
  }
}

async function main() {
  console.log('=== Car Assembly Kids - Asset Generator ===\n')

  console.log('--- Generating Images (Gemini 2.0 Flash Exp) ---')
  for (const part of PARTS) {
    await generateImage(part.id, part.imagePrompt)
    await new Promise(r => setTimeout(r, 1500))
  }

  console.log('\n--- Generating Audio Narrations (Gemini 2.5 Flash TTS) ---')
  for (const part of PARTS) {
    await generateAudio(part.id, part.narrationText)
    await new Promise(r => setTimeout(r, 1500))
  }

  console.log('\n--- Generating RC Car Images ---')
  for (const part of RC_PARTS) {
    await generateImage(part.id, part.imagePrompt)
    await new Promise(r => setTimeout(r, 1500))
  }

  console.log('\n--- Generating RC Car Audio Narrations ---')
  for (const part of RC_PARTS) {
    await generateAudio(part.id, part.narrationText)
    await new Promise(r => setTimeout(r, 1500))
  }

  console.log('\n--- Generating Extra Narrations ---')
  for (const item of EXTRA_NARRATIONS) {
    await generateAudio(item.id, item.text)
    await new Promise(r => setTimeout(r, 1500))
  }

  console.log('\n=== Done! Check public/assets/ for generated files ===')
}

main().catch(console.error)
