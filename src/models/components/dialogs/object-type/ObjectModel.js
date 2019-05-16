import React, { Component } from 'react'
import { func, instanceOf } from 'prop-types'
import { ObjectModelType } from 'src/lib/types/models/ObjectModelType'
import { onStringChange } from 'src/models/helpers/onStringChange'
import { dialogTypeOnBlur } from 'src/models/helpers/dialogTypeOnBlur'
import { dialogConstructor } from 'src/models/helpers/dialogConstructor'
import { dialogTypeOnDone } from 'src/models/helpers/dialogTypeOnDone'
import { Steps } from 'src/models/components/dialogs/Steps'

export class ObjectModel extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onStepChange: func.isRequired,
    onFirstBack: func,
    onDone: func.isRequired,
    initialModel: instanceOf(ObjectModelType),
  }

  static defaultProps = {
    initialModel: null,
    onFirstBack: null,
  }

  getClearState() {
    return {
      model: {
        type: 'object',
        additionalProperties: false,
        required: [],
        properties: {},
      },
      errors: {
        apiId: '',
        title: '',
        description: '',
      },
    }
  }

  constructor(props) {
    super(props)
    const { initialModel } = props
    dialogConstructor.call(this, props, initialModel)
  }

  componentDidMount() {
    const { onStepChange } = this.props
    onStepChange(1, 1)
  }

  onStringChange(...props) {
    onStringChange.call(this, ...props)
  }

  onBlur(field) {
    dialogTypeOnBlur.call(this, { Type: ObjectModelType, field })
  }

  onDone() {
    const { onDone } = this.props
    dialogTypeOnDone.call(this, { Type: ObjectModelType, fields: ['apiId', 'title', 'description'], onDone })
  }

  render() {
    const { model, errors } = this.state
    const { onClose, onFirstBack } = this.props
    return (
      <Steps
        onSelectChange={() => {}}
        onStringChange={(...props) => this.onStringChange(...props)}
        onNumberChange={() => {}}
        onBooleanChange={() => {}}
        onBlur={(...props) => this.onBlur(...props)}
        onClose={onClose}
        onBack={onFirstBack}
        onDone={(...props) => this.onDone(...props)}
        step={1}
        steps={[
          [
            {
              type: 'string',
              name: 'apiId',
              label: 'API ID',
              required: true,
              value: model.apiId,
              error: errors.apiId,
            },
            {
              type: 'string',
              name: 'title',
              label: 'Title',
              required: true,
              value: model.title,
              error: errors.title,
            },
            {
              type: 'string',
              name: 'description',
              label: 'Description',
              required: false,
              value: model.description,
              error: errors.description,
            },
          ],
        ]}
      />
    )
  }
}
