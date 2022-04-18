import classNames from 'classnames'
import React, { Fragment, useState, useEffect } from 'react'
import { BarChart2, Bell, Edit, RefreshCw, Sliders, Tool, Trash, TrendingUp } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { Card, CardHeader, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'
import { handleGetAppList, handlePageChange, handleSelectChange, resetAppList } from '../../redux/actions/App/GetAppListAction'
import { handleDeleteApp } from '../../redux/actions/App/DeleteAppAction'

function AppsList() {
  const dispatch = useDispatch()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [platform, setPlatform] = useState('')
  const { page, limit, totalRecords, totalPages, appListData, appListInProcess, error, deleteInProcess, isDeleted } = useSelector(
    state => state.appList
  )

  useEffect(() => {
    dispatch(handleGetAppList(page, limit, platform, searchKeyword))
  }, [platform, searchKeyword, isDeleted])

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
  }

  const onPlatformChangeHandler = e => {
    setPlatform(e.target.value)
  }

  const handleLimitChange = e => {
    dispatch(handleSelectChange(e.target.value, limit, platform, searchKeyword))
  }

  const handlePagination = page => {
    dispatch(handlePageChange(page, limit, platform, searchKeyword))
  }

  const deleteEventHandler = appId => {
    if (confirm(`Are you sure you want to delete the app with ID: ${appId} ?`)) {
      dispatch(handleDeleteApp(appId, page, limit, searchKeyword))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetAppList())
    }
  }, [])

  const resetFilters = () => {
    setPlatform('')
    setSearchKeyword('')
  }

  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'}
      />
    )
  }

  return (
    <Fragment>
      <Card>
        <Row className='mx-0 mt-1 mb-75 justify-content-between align-items-center'>
          <CardHeader>
            <CardTitle>Apps List</CardTitle>
          </CardHeader>
        </Row>

        <Row className='mx-0 mt-1 mb-75 justify-content-start'>
          <Col sm={12} md={6} lg={3} className='mb-1'>
            <div className='d-flex align-items-center'>
              <Label style={{ marginRight: '10px' }} className='mr-1' for='limit'>
                Show
              </Label>
              <Input
                style={{ width: '70px' }}
                className='dataTable-select mr-1'
                type='select'
                id='limit'
                name='limit'
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Input>
              <Label for='limit' style={{ marginLeft: '10px' }}>
                Records
              </Label>
            </div>
          </Col>

          <Col sm={12} md={6} lg={5} className='d-flex align-items-center justify-content-sm-end mb-1 mt-sm-0 mt-1'>
            <Label className='mr-1' style={{ marginRight: '15px' }} for='searchKeyword'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              placeholder='Search...'
              id='searchKeyword'
              name='searchKeyword'
              onChange={onChangeHandler}
            />
          </Col>

          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='type' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} className='mr-1'>
                Platform
              </Label>

              <Input
                style={{ width: '180px' }}
                className='dataTable-select mr-1'
                type='select'
                id='type'
                name='type'
                value={platform}
                onChange={onPlatformChangeHandler}
              >
                <option value=''>Choose...</option>
                <option value='android'>Android</option>
                <option value='ios'>IOS</option>
              </Input>
            </div>
          </Col>

          <Col sm={6} lg={3} style={{ marginTop: 7 }}>
            <Label for='resetFilter' style={{ marginRight: '10px' }} className='mr-1'>
              Reset Filters
            </Label>
            <RefreshCw style={{ cursor: 'pointer' }} onClick={resetFilters} size={20} />
          </Col>
        </Row>

        {/* loading */}
        {appListInProcess || deleteInProcess ? (
          <Spinner />
        ) : appListData?.apps ? (
          <Table responsive>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>Id</th>
                <th>Name</th>
                <th>Platform</th>
                <th>Add Promotion</th>
                <th>Send Notification</th>
                <th>Update Settings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appListData.apps.map((app, index) => (
                <tr style={{ textAlign: 'center' }} key={index}>
                  <td>{app._id}</td>
                  <td>{app.name}</td>
                  <td>{app.platform}</td>

                  <td>
                    <Link to={`/add-promotion/${app?._id}`}>
                      <BarChart2 style={{ cursor: 'pointer' }} className='mr-50 text-primary' size={20} />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/send-push-notification/${app?._id}`}>
                      <Bell style={{ cursor: 'pointer' }} className='mr-50 text-secondary' size={20} />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/update-ad/${app?._id}`} style={{ marginRight: '10px' }}>
                      <Sliders style={{ cursor: 'pointer' }} className='mr-50 text-info' size={20} />
                    </Link>

                    <Link to={`/in-app-update-setting/${app?._id}`}>
                      <Tool style={{ cursor: 'pointer' }} className='mr-50 text-warning' size={20} />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/update-app/${app?._id}`} style={{ marginRight: '10px' }}>
                      <Edit style={{ cursor: 'pointer' }} className='mr-50 text-success' size={15} />
                    </Link>
                    <Link to={isDeleted ? '/list-apps' : '/list-apps'}>
                      <Trash
                        onClick={() => deleteEventHandler(app?._id)}
                        style={{ cursor: 'pointer' }}
                        className={classNames({ 'text-danger': true })}
                        size={15}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Card>
            <CardHeader>No Record Found!</CardHeader>
          </Card>
        )}

        <Row className='mx-0 justify-content-between'>
          <Col className='mt-1' sm='12' md={6}>
            <span>
              <b>Total Records:</b> {totalRecords}
            </span>
          </Col>
          <Col sm='12' md={6}>
            <CustomPagination />
          </Col>
        </Row>
      </Card>
    </Fragment>
  )
}

export default AppsList
