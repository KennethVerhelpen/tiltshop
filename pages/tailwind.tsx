// import SelectUnstyled from "@mui/base/SelectUnstyled";
// import OptionUnstyled from "@mui/base/OptionUnstyled";
import { Button, ButtonProps } from "../components/button";
import { ArrowForwardRounded } from "@mui/icons-material";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

// const optionStyled = {
//   root: {
//     className: "rounded-md hover:bg-gray-50 px-4 py-2 text-sm",
//   },
// };

const variants =  ['outlined', 'raised', 'soft', 'strong'];
const sizes =  ['xs', 'sm', 'md', 'lg', 'xl'];

export const Tailwind = () => {
  return (
    <div className="flex flex-col h-screen w-screen place-items-center justify-center bg-zinc-50">
      {variants.map((variant: ButtonProps['variant']) => (
        <div className="flex-row flex p-2 place-items-center" key={variant}>
          {sizes.map((size: ButtonProps['size']) => (
            <Button
              size={size}
              key={size}
              label={"Button"}
              variant={variant}
              className="mr-2"
              trailingIcon={<ArrowRightIcon className="w-4 h-4"/>}
            />
          ))}
        </div>
      ))}
    </div>
    // <>
    //   <header className="bg-white">
    //     <nav
    //       className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    //       aria-label="Global"
    //     >
    //       <div className="flex lg:flex-1">
    //         <a href="#" className="-m-1.5 p-1.5">
    //           <span className="sr-only">Your Company</span>
    //           <img
    //             className="h-8 w-auto"
    //             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //             alt=""
    //           />
    //         </a>
    //       </div>
    //       <div className="flex lg:hidden">
    //         <button
    //           type="button"
    //           className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
    //           onClick={() => setMobileMenuOpen(true)}
    //         >
    //           <span className="sr-only">Open main menu</span>
    //           <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    //         </button>
    //       </div>
    //       <Popover.Group className="hidden lg:flex lg:gap-x-12">
    //         <Popover className="relative">
    //           <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
    //             Product
    //             <ChevronDownIcon
    //               className="h-5 w-5 flex-none text-gray-400"
    //               aria-hidden="true"
    //             />
    //           </Popover.Button>

    //           <Transition
    //             as={Fragment}
    //             enter="transition ease-out duration-200"
    //             enterFrom="opacity-0 translate-y-1"
    //             enterTo="opacity-100 translate-y-0"
    //             leave="transition ease-in duration-150"
    //             leaveFrom="opacity-100 translate-y-0"
    //             leaveTo="opacity-0 translate-y-1"
    //           >
    //             <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
    //               <div className="p-4">
    //                 {products.map((item) => (
    //                   <div
    //                     key={item.name}
    //                     className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
    //                   >
    //                     <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
    //                       <item.icon
    //                         className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
    //                         aria-hidden="true"
    //                       />
    //                     </div>
    //                     <div className="flex-auto">
    //                       <a
    //                         href={item.href}
    //                         className="block font-semibold text-gray-900"
    //                       >
    //                         {item.name}
    //                         <span className="absolute inset-0" />
    //                       </a>
    //                       <p className="mt-1 text-gray-600">
    //                         {item.description}
    //                       </p>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </div>
    //               <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
    //                 {callsToAction.map((item) => (
    //                   <a
    //                     key={item.name}
    //                     href={item.href}
    //                     className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
    //                   >
    //                     <item.icon
    //                       className="h-5 w-5 flex-none text-gray-400"
    //                       aria-hidden="true"
    //                     />
    //                     {item.name}
    //                   </a>
    //                 ))}
    //               </div>
    //             </Popover.Panel>
    //           </Transition>
    //         </Popover>

    //         <a
    //           href="#"
    //           className="text-sm font-semibold leading-6 text-gray-900"
    //         >
    //           Features
    //         </a>
    //         <a
    //           href="#"
    //           className="text-sm font-semibold leading-6 text-gray-900"
    //         >
    //           Marketplace
    //         </a>
    //         <a
    //           href="#"
    //           className="text-sm font-semibold leading-6 text-gray-900"
    //         >
    //           Company
    //         </a>
    //       </Popover.Group>
    //       <div className="hidden lg:flex lg:flex-1 lg:justify-end">
    //         <a
    //           href="#"
    //           className="text-sm font-semibold leading-6 text-gray-900"
    //         >
    //           Log in <span aria-hidden="true">&rarr;</span>
    //         </a>
    //       </div>
    //     </nav>
    //     <Dialog
    //       as="div"
    //       className="lg:hidden"
    //       open={mobileMenuOpen}
    //       onClose={setMobileMenuOpen}
    //     >
    //       <div className="fixed inset-0 z-10" />
    //       <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    //         <div className="flex items-center justify-between">
    //           <a href="#" className="-m-1.5 p-1.5">
    //             <span className="sr-only">Your Company</span>
    //             <img
    //               className="h-8 w-auto"
    //               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //               alt=""
    //             />
    //           </a>
    //           <button
    //             type="button"
    //             className="-m-2.5 rounded-md p-2.5 text-gray-700"
    //             onClick={() => setMobileMenuOpen(false)}
    //           >
    //             <span className="sr-only">Close menu</span>
    //             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
    //           </button>
    //         </div>
    //         <div className="mt-6 flow-root">
    //           <div className="-my-6 divide-y divide-gray-500/10">
    //             <div className="space-y-2 py-6">
    //               <Disclosure as="div" className="-mx-3">
    //                 {({ open }) => (
    //                   <>
    //                     <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
    //                       Product
    //                       <ChevronDownIcon
    //                         className={classNames(
    //                           open ? "rotate-180" : "",
    //                           "h-5 w-5 flex-none"
    //                         )}
    //                         aria-hidden="true"
    //                       />
    //                     </Disclosure.Button>
    //                     <Disclosure.Panel className="mt-2 space-y-2">
    //                       {[...products, ...callsToAction].map((item) => (
    //                         <Disclosure.Button
    //                           key={item.name}
    //                           as="a"
    //                           href={item.href}
    //                           className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                         >
    //                           {item.name}
    //                         </Disclosure.Button>
    //                       ))}
    //                     </Disclosure.Panel>
    //                   </>
    //                 )}
    //               </Disclosure>
    //               <a
    //                 href="#"
    //                 className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //               >
    //                 Features
    //               </a>
    //               <a
    //                 href="#"
    //                 className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //               >
    //                 Marketplace
    //               </a>
    //               <a
    //                 href="#"
    //                 className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //               >
    //                 Company
    //               </a>
    //             </div>
    //             <div className="py-6">
    //               <a
    //                 href="#"
    //                 className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //               >
    //                 Log in
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </Dialog.Panel>
    //     </Dialog>
    //   </header>
    //   <main className="p-8 bg-slate-100">
    //     <div className="w-72">
    //       <Combobox value={selected} onChange={setSelected}>
    //         <div className="relative mt-1">
    //           <div className="relative w-full cursor-pointer overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
    //             <Combobox.Input
    //               className="w-full outline-none border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
    //               displayValue={(person: any) => person.name}
    //               onChange={(event) => setQuery(event.target.value)}
    //             />
    //             <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
    //               <ChevronUpDownIcon
    //                 className="h-5 w-5 text-gray-400"
    //                 aria-hidden="true"
    //               />
    //             </Combobox.Button>
    //           </div>
    //           <Transition
    //             as={Fragment}
    //             leave="transition ease-in duration-100"
    //             leaveFrom="opacity-100"
    //             leaveTo="opacity-0"
    //             afterLeave={() => setQuery("")}
    //           >
    //             <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    //               {filteredPeople.length === 0 && query !== "" ? (
    //                 <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
    //                   Nothing found.
    //                 </div>
    //               ) : (
    //                 filteredPeople.map((person) => (
    //                   <Combobox.Option
    //                     key={person.id}
    //                     className={({ active }) =>
    //                       `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
    //                         active ? "bg-teal-600 text-white" : "text-gray-900"
    //                       }`
    //                     }
    //                     value={person}
    //                   >
    //                     {({ selected, active }) => (
    //                       <>
    //                         <span
    //                           className={`block truncate ${
    //                             selected ? "font-medium" : "font-normal"
    //                           }`}
    //                         >
    //                           {person.name}
    //                         </span>
    //                         {selected ? (
    //                           <span
    //                             className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
    //                               active ? "text-white" : "text-teal-600"
    //                             }`}
    //                           >
    //                             <CheckIcon
    //                               className="h-5 w-5"
    //                               aria-hidden="true"
    //                             />
    //                           </span>
    //                         ) : null}
    //                       </>
    //                     )}
    //                   </Combobox.Option>
    //                 ))
    //               )}
    //             </Combobox.Options>
    //           </Transition>
    //         </div>
    //       </Combobox>
    //       <div className="py-16">
    //         <Switch
    //           checked={enabled}
    //           onChange={setEnabled}
    //           className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
    //             relative inline-flex h-[16px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    //         >
    //           <span className="sr-only">Use setting</span>
    //           <span
    //             aria-hidden="true"
    //             className={`${enabled ? "translate-x-9" : "translate-x-0"}
    //               pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
    //           />
    //         </Switch>
    //       </div>
    //     </div>
    //   </main>
    // </>

    // <div className="h-screen w-screen flex place-items-center justify-center">
    //   <SelectUnstyled
    //     defaultValue={10}
    //     slotProps={{
    //       root: {
    //         className:
    //           "mx-1 rounded-md text-sm self-center bg-blue-600 text-slate-50 drop-shadow-sm border border-blue-700 shadow-blue-600 px-4 py-2 w-min active:bg-blue-700 ",
    //       },
    //       popper: {
    //         className:
    //           "bg-white drop-shadow-xl rounded-md border border-gray-200",
    //       },
    //       listbox: {
    //         className: "cursor-pointer",
    //       },
    //     }}
    //   >
    //     <OptionUnstyled slotProps={optionStyled} value={10}>
    //       Ten
    //     </OptionUnstyled>
    //     <OptionUnstyled slotProps={optionStyled} value={20}>
    //       Twenty
    //     </OptionUnstyled>
    //     <OptionUnstyled slotProps={optionStyled} value={30}>
    //       Thirty
    //     </OptionUnstyled>
    //   </SelectUnstyled>
    //   <SelectUnstyled
    //     defaultValue={10}
    //     slotProps={{
    //       root: {
    //         className:
    //           "mx-1 rounded-md text-sm self-center bg-white drop-shadow-sm border border-grey-200 px-4 py-2 w-min",
    //       },
    //       popper: {
    //         className:
    //           "bg-white drop-shadow-xl rounded-md border border-gray-200",
    //       },
    //       listbox: {
    //         className: "cursor-pointer",
    //       },
    //     }}
    //   >
    //     <OptionUnstyled slotProps={optionStyled} value={10}>
    //       <span>Ten</span>
    //     </OptionUnstyled>
    //     <OptionUnstyled slotProps={optionStyled} value={20}>
    //       Twenty
    //     </OptionUnstyled>
    //     <OptionUnstyled slotProps={optionStyled} value={30}>
    //       Thirty
    //     </OptionUnstyled>
    //   </SelectUnstyled>
    //   <Icon baseClassName="text-sm" className="text-sm arrow-forward-rounded" />
    // </div>
  );
};

export default Tailwind;
