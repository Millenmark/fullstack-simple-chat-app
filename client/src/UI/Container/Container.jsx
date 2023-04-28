import PropTypes from 'prop-types'
import style from './Container.module.css'

const Container = ({children, className}) => {
  return (
    <div className={`${style.container} ${className}`}>{children}</div>
  )
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Container