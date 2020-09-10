export default class GuideController {
  public async index ({ view }) {
    return view.render('guide')
  }

  public async student ({ view }) {
    return view.render('guide_student')
  }

  public async teacher ({ view }) {
    return view.render('guide_teacher')
  }
}
