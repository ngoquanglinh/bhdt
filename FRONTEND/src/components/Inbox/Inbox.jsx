import React from 'react'

function Inbox() {
  return (
    <div className="row">
      <div className="col-lg-5 col-xl-4 grid-margin grid-margin-xl-0 stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-baseline mb-2">
              <h6 className="card-title mb-0">Inbox</h6>
              <div className="dropdown mb-2">
                <button className="btn p-0" type="button" id="dropdownMenuButton6" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton6">
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="eye" className="icon-sm mr-2"></i> <span className="">View</span></a>
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="edit-2" className="icon-sm mr-2"></i> <span className="">Edit</span></a>
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="trash" className="icon-sm mr-2"></i> <span className="">Delete</span></a>
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="printer" className="icon-sm mr-2"></i> <span className="">Print</span></a>
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="download" className="icon-sm mr-2"></i> <span className="">Download</span></a>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <a href="#" className="d-flex align-items-center border-bottom pb-3">
                <div className="mr-3">
                  <img src="../assets/images/faces/face2.jpg" className="rounded-circle wd-35" alt="user" />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="text-body mb-2">Leonardo Payne</h6>
                    <p className="text-muted tx-12">12.30 PM</p>
                  </div>
                  <p className="text-muted tx-13">Hey! there I'm available...</p>
                </div>
              </a>
              <a href="#" className="d-flex align-items-center border-bottom py-3">
                <div className="mr-3">
                  <img src="../assets/images/faces/face3.jpg" className="rounded-circle wd-35" alt="user" />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="text-body mb-2">Carl Henson</h6>
                    <p className="text-muted tx-12">02.14 AM</p>
                  </div>
                  <p className="text-muted tx-13">I've finished it! See you so..</p>
                </div>
              </a>
              <a href="#" className="d-flex align-items-center border-bottom py-3">
                <div className="mr-3">
                  <img src="../assets/images/faces/face4.jpg" className="rounded-circle wd-35" alt="user" />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="text-body mb-2">Jensen Combs</h6>
                    <p className="text-muted tx-12">08.22 PM</p>
                  </div>
                  <p className="text-muted tx-13">This template is awesome!</p>
                </div>
              </a>
              <a href="#" className="d-flex align-items-center border-bottom py-3">
                <div className="mr-3">
                  <img src="../assets/images/faces/face5.jpg" className="rounded-circle wd-35" alt="user" />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="text-body mb-2">Amiah Burton</h6>
                    <p className="text-muted tx-12">05.49 AM</p>
                  </div>
                  <p className="text-muted tx-13">Nice to meet you</p>
                </div>
              </a>
              <a href="#" className="d-flex align-items-center border-bottom py-3">
                <div className="mr-3">
                  <img src="../assets/images/faces/face6.jpg" className="rounded-circle wd-35" alt="user" />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="text-body mb-2">Yaretzi Mayo</h6>
                    <p className="text-muted tx-12">01.19 AM</p>
                  </div>
                  <p className="text-muted tx-13">Hey! there I'm available...</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7 col-xl-8 stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-baseline mb-2">
              <h6 className="card-title mb-0">Projects</h6>
              <div className="dropdown mb-2">
                <button className="btn p-0" type="button" id="dropdownMenuButton7" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton7">
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="eye" className="icon-sm mr-2"></i> <span className="">View</span></a>
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="edit-2" className="icon-sm mr-2"></i> <span className="">Edit</span></a>
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="trash" className="icon-sm mr-2"></i> <span className="">Delete</span></a>
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="printer" className="icon-sm mr-2"></i> <span className="">Print</span></a>
                  <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="download" className="icon-sm mr-2"></i> <span className="">Download</span></a>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th className="pt-0">#</th>
                    <th className="pt-0">Project Name</th>
                    <th className="pt-0">Start Date</th>
                    <th className="pt-0">Due Date</th>
                    <th className="pt-0">Status</th>
                    <th className="pt-0">Assign</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>NobleUI jQuery</td>
                    <td>01/01/2021</td>
                    <td>26/04/2021</td>
                    <td><span className="badge badge-danger">Released</span></td>
                    <td>Leonardo Payne</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>NobleUI Angular</td>
                    <td>01/01/2021</td>
                    <td>26/04/2021</td>
                    <td><span className="badge badge-success">Review</span></td>
                    <td>Carl Henson</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>NobleUI ReactJs</td>
                    <td>01/05/2021</td>
                    <td>10/09/2021</td>
                    <td><span className="badge badge-info-muted">Pending</span></td>
                    <td>Jensen Combs</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>NobleUI VueJs</td>
                    <td>01/01/2021</td>
                    <td>31/11/2021</td>
                    <td><span className="badge badge-warning">Work in Progress</span>
                    </td>
                    <td>Amiah Burton</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>NobleUI Laravel</td>
                    <td>01/01/2021</td>
                    <td>31/12/2021</td>
                    <td><span className="badge badge-danger-muted text-white">Coming soon</span></td>
                    <td>Yaretzi Mayo</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>NobleUI NodeJs</td>
                    <td>01/01/2021</td>
                    <td>31/12/2021</td>
                    <td><span className="badge badge-primary">Coming soon</span></td>
                    <td>Carl Henson</td>
                  </tr>
                  <tr>
                    <td className="border-bottom">3</td>
                    <td className="border-bottom">NobleUI EmberJs</td>
                    <td className="border-bottom">01/05/2021</td>
                    <td className="border-bottom">10/11/2021</td>
                    <td className="border-bottom"><span className="badge badge-info-muted">Pending</span></td>
                    <td className="border-bottom">Jensen Combs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Inbox
