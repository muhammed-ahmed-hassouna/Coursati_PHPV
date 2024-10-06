export default function Label({ text, isRequired = false, forId, className }) {
  return (
    <label className={`mb-[4px] block text-sm font-medium mt-4 ${className}`} htmlFor={forId}>
      <span className='text-grayscale_3 text-custom-xs leading-custom-24 select-none'>
        {text}
      </span>
      {isRequired && (
        <span className='text-red-500 text-custom-xs leading-custom-24'>
          {' '}
          *
        </span>
      )}
    </label>
  );
}
