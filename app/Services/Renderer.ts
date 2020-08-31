import clip from 'text-clipper'
import { Remarkable } from 'remarkable'

export default class Renderer {
  public static renderer = new Remarkable({
    html: false,
    breaks: true,
    typographer: true,
  })

  public static render (markdown: string) : string {
    return this.renderer.render(markdown)
  }

  public static cut (html: string) : string {
    return clip(html, 1000, {
      html: true,
      maxLines: 15,
    })
  }
}
