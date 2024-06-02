import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'

const Form = () => {
  const [selectedQueryTypes, setSelectedQueryTypes] = useState([])
  const {
    control,
    handleSubmit,
    clearErrors,
    register,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const handleCheckboxChange = (value) => {
    if (selectedQueryTypes === value) {
      setSelectedQueryTypes([])
    } else {
      setSelectedQueryTypes([value])
      clearErrors('queryType')
    }
  }

  return (
    <div className='bg-emerald-100 w-full min-h-screen flex items-center justify-center'>
      <div className='bg-white m-8 rounded-3xl max-w-xl w-full'>
        <form
          className='flex flex-col justify-center border p-8'
          onSubmit={onSubmit}
        >
          <h1 className='font-semibold text-xl mb-4'>Contact Us</h1>
          <div className='flex flex-col md:flex-row mb-4 md:justify-between'>
            <div className='mr-0 md:mr-4 mb-4 md:mb-0 md:w-1/2'>
              <label className='text-gray-500' htmlFor='firstName'>
                First Name *
              </label>
              <input
                className={`border p-2 w-full rounded-md text-gray-700 hover:border-teal-700 cursor-pointer ${
                  errors.firstName ? 'border-red-600' : 'border-gray-500'
                }`}
                type='text'
                name='firstName'
                id='firstName'
                {...register('firstName', {
                  required: 'This field is required'
                })}
                autoComplete='given-name'
                placeholder='Enter your first name'
              />
              {errors.firstName && (
                <span className='text-red-600 text-xs'>
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className='md:w-1/2'>
              <label className='text-gray-500' htmlFor='lastName'>
                Last Name *
              </label>
              <input
                className={`border p-2 w-full rounded-md text-gray-700 hover:border-teal-700 cursor-pointer ${
                  errors.lastName ? 'border-red-600' : 'border-gray-500'
                }`}
                type='text'
                name='lastName'
                id='lastName'
                {...register('lastName', {
                  required: 'This field is required'
                })}
                placeholder='Enter your last name'
              />
              {errors.lastName && (
                <span className='text-red-600 text-xs'>
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className='block w-full mb-4'>
            <label className='text-gray-500' htmlFor='email'>
              Email *
            </label>
            <input
              className={`border p-2 w-full rounded-md text-gray-700 hover:border-teal-700 cursor-pointer ${
                errors.email ? 'border-red-600' : 'border-gray-500'
              }`}
              type='email'
              name='email'
              id='email'
              {...register('email', {
                required: 'Please enter a valid email address'
              })}
              autoComplete='email'
              placeholder='Enter your email'
            />
            {errors.email && (
              <span className='text-red-600 text-xs'>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className='mb-4'>
            <label className='block text-gray-500 mb-2' htmlFor='queryType'>
              Query Type *
            </label>
            <div className='flex flex-col md:flex-row md:space-x-4'>
              <Controller
                name='queryType'
                control={control}
                rules={{ required: 'Please select a query type' }}
                render={({ field }) => (
                  <>
                    <div
                      className={`w-full py-2 pl-2 border rounded-md bg-white mb-4 md:mb-0 hover:border-teal-700 cursor-pointer ${
                        selectedQueryTypes.includes('general')
                          ? 'border-teal-700'
                          : 'border-gray-500'
                      } `}
                      onClick={() => {
                        handleCheckboxChange('general')
                        field.onChange(['general'])
                      }}
                    >
                      <input
                        type='checkbox'
                        id='generalCheckbox'
                        checked={selectedQueryTypes.includes('general')}
                        readOnly
                      />
                      <label
                        className='ml-2 text-gray-500'
                        htmlFor='generalCheckbox'
                      >
                        General Enquiry
                      </label>
                    </div>
                    <div
                      className={`w-full py-2 pl-2 border rounded-md bg-white hover:border-teal-700 cursor-pointer ${
                        selectedQueryTypes.includes('support')
                          ? 'border-teal-700'
                          : 'border-gray-500'
                      } `}
                      onClick={() => {
                        handleCheckboxChange('support')
                        field.onChange(['support'])
                      }}
                    >
                      <input
                        type='checkbox'
                        id='supportCheckbox'
                        checked={selectedQueryTypes.includes('support')}
                        readOnly
                      />
                      <label
                        className='ml-2 text-gray-500'
                        htmlFor='supportCheckbox'
                      >
                        Support Request
                      </label>
                    </div>
                  </>
                )}
              />
            </div>
            {errors.queryType && (
              <span className='text-red-600 text-xs'>
                {errors.queryType.message}
              </span>
            )}
          </div>

          <div className='mt-4'>
            <label htmlFor='message' className='block w-full text-gray-500'>
              Message *
            </label>
            <textarea
              name='message'
              id='message'
              {...register('message', {
                required: 'This field is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters long'
                }
              })}
              className={`w-full border rounded-md h-32 p-2 text-gray-700 md:h-20 hover:border-teal-700 cursor-text ${
                errors.message ? 'border-red-600' : 'border-gray-500'
              }`}
              placeholder='Enter your message'
            />
            {errors.message && (
              <span className='text-red-600  text-xs'>
                {errors.message.message}
              </span>
            )}
          </div>

          <div className='flex mt-4 items-center'>
            <input
              className='mr-2 cursor-pointer'
              type='checkbox'
              id='subscribe'
              {...register('subscribe', {
                required:
                  'To submit this form, please consent to being contacted'
              })}
            />
            <label className='text-gray-500 text-xs' htmlFor='subscribe'>
              I consent to be contacted by the team
            </label>
          </div>

          {errors.subscribe && (
            <span className='text-red-600 text-xs'>
              {errors.subscribe.message}
            </span>
          )}
          <button
            type='submit'
            className='bg-teal-700 hover:bg-teal-900 text-white font-semibold rounded-md py-2 cursor-pointer mt-8'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
