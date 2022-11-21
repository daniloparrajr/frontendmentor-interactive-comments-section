const Modal = ({ onHideModal, onDeleteComment }) => {
  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-50 mix-blend-normal transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform m-4 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-[400px]">
            <div className="bg-white px-7 py-6 lg:p-8">
              <h3 className="text-lg font-medium text-dark-blue mb-4 lg:font-lg lg:mb-5" id="modal-title">Delete comment</h3>
              <p className="text-grayish-blue mb-4 lg:mb-5">Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
              <div className="flex">
                <button onClick={()=>onHideModal(false)} className="btn bg-grayish-blue px-5 w-full block mr-3 lg:mr-3.5">NO, CANCEL</button>
                <button onClick={onDeleteComment} className="btn bg-soft-red px-5 w-full block">YES, DELETE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;