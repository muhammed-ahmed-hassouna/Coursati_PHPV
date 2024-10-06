export default function ErrorFormik({ isTouched, isError, error }) {
    return (
      <>
        {isError && isTouched ? (
          <div
            className={`text-red-500 text-sm font-weight-medium line-height-normal mt-2`}
          >
            {error}
          </div>
        ) : null}
      </>
    );
  }
  