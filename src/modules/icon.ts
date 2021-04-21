import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faClock } from '@fortawesome/free-regular-svg-icons'

export function render() {
	library.add(faClock)

	dom.i2svg()
}
