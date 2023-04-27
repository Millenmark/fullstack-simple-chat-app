import style from './Button.module.css'
import PropTypes from 'prop-types'

const Button = ({children, className, type, bgColor}) => {
  let color = '';

  switch (bgColor) {
    case 'primary':
      color = '#07B7DC';
      break
    case 'secondary':
      color = '#34495e';
      break
    case 'success':
      color = '#59ebcb';
      break
    case 'danger':
      color = '#ff8975';
      break
    default:
      color = '';
  }

  return (
    <button 
      type={type || "button"} 
      className={`${style.button} ${className}`}
      style={{backgroundColor: color}}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  bgColor: PropTypes.oneOf(['', 'primary', 'secondary', 'success', 'danger']).isRequired,
};

export default Button