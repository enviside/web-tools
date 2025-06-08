import express, { Request, Response } from 'express'
import axios from 'axios'
import iconv from 'iconv-lite'

const app = express()
const PORT = 8222

app.get('/decode', async (req: Request, res: Response): Promise<any> => {
  const url = req.query.url as string | undefined
  const formateUrl = `https://api.scrape.do?token=e24d0fbee61140cbb50feaf0509a361ebca1d08996f&url=${url}`

  if (!formateUrl) {
    return res.status(400).json({ error: 'Missing ?url= parameter' })
  }

  try {
    const response = await axios.get<ArrayBuffer>(formateUrl, {
      responseType: 'arraybuffer',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DecoderBot/1.0)'
      }
    })

    const decodedHtml = iconv.decode(Buffer.from(response.data), 'windows-1251')

    res.json({ html: decodedHtml })
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Unknown error' })
  }
})

app.listen(PORT, () => {
  console.log(`Web Tools running at http://localhost:${PORT}`)
})