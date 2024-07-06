import PropTypes from 'prop-types'

const Progress = ({ percentage, currentFile, totalFiles }) => {
  return (
    <div className="mt-2">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-500 bg-slate-200">
            {`Uploading ${currentFile} of ${totalFiles} file(s)`}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-slate-500">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 flex rounded bg-slate-200">
        <div style={{ width: `${percentage}%` }} className="bg-blue-500"></div>
      </div>
    </div>
  )
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
  currentFile: PropTypes.number.isRequired,
  totalFiles: PropTypes.number.isRequired,
}

export default Progress
