import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    container: {
      color: colors.primary.main,
    },
  })
  .attach()

export const cn = classes
