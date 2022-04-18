import React, { useState, useEffect, Fragment } from 'react'
import classNames from 'classnames'
import Spinner from '../common/Spinner'
import ReactPaginate from 'react-paginate'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image, RefreshCw, Send, Trash2 } from 'react-feather'
import { handleGetAppList } from '../../redux/actions/App/GetAppListAction'
import { Card, CardHeader, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'
import {
  handleDeleteNotification,
  handleNotificationsList,
  handlePageChangeNotifications,
  handleSelectChangeNotifications,
  resetNotificationsList
} from '../../redux/actions/notifications/listNotificationsAction'
import { handleResendPushNotification } from '../../redux/actions/notifications/pushNotificationAction'

function listNotifications() {
  const dispatch = useDispatch()
  const [appId, setAppId] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  const { appListInProcess, appListData } = useSelector(state => state.appList)
  const { resendInProcess, resend } = useSelector(state => state.resendNotification)
  const { page, limit, deleteInProcess, inProcess, pushNotifications, isDeleted, totalRecords, totalPages } = useSelector(
    state => state.listNotification
  )

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'appId') setAppId(value)
  }

  const resetFilters = () => {
    setSearchKeyword('')
    setAppId('')
  }

  useEffect(() => {
    dispatch(handleGetAppList(page, limit, appId, searchKeyword))
  }, [appId, searchKeyword, isDeleted])

  const handlePagination = page => {
    dispatch(handlePageChangeNotifications(page, limit, searchKeyword))
  }

  const handleLimitChange = e => {
    dispatch(handleSelectChangeNotifications(e.target.value, limit, searchKeyword))
  }

  const deleteEventHandler = app_Id => {
    if (confirm(`Are you sure you want to delete the notification with ID : ${app_Id} ?`)) {
      dispatch(handleDeleteNotification(app_Id))
    }
  }

  const resendNotification = app_Id => {
    if (confirm(`Are you sure you want to Resend this notification with ID : ${app_Id} ?`)) {
      dispatch(handleResendPushNotification(app_Id))
    }
  }

  useEffect(() => {
    dispatch(handleNotificationsList(page, limit, appId, searchKeyword))
  }, [appId, searchKeyword, isDeleted, resend])

  useEffect(() => {
    return () => {
      dispatch(resetNotificationsList())
    }
  }, [])

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
        <CardHeader>
          <CardTitle>Notifications List</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-75 justify-content-start'>
          <Col sm={12} md={6} lg={2} className='mb-1'>
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

          <Col sm={12} md={6} lg={3} className='d-flex align-items-center justify-content-sm-start mb-1 mt-sm-0 mt-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='appId' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} className='mr-1'>
                App Id
              </Label>

              <Input
                style={{ width: '180px' }}
                className='dataTable-select mr-1'
                type='select'
                id='appId'
                name='appId'
                value={appId}
                onChange={onChangeHandler}
              >
                <option value=''>Choose...</option>
                {/* {} */}
                {appListInProcess ? (
                  <option value=''>Loading...</option>
                ) : (
                  appListData?.apps.map(appsFilter => (
                    <option key={appsFilter._id} value={appsFilter._id}>
                      {appsFilter.name}
                    </option>
                  ))
                )}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} className='d-flex align-items-center justify-content-sm-end mb-1 mt-sm-0 mt-1'>
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

          <Col sm={6} lg={3} style={{ marginTop: 7 }}>
            <Label for='resetFilter' style={{ marginRight: '10px' }} className='mr-1'>
              Reset Filters
            </Label>
            <RefreshCw style={{ cursor: 'pointer' }} onClick={resetFilters} size={20} />
          </Col>
        </Row>
        {inProcess || deleteInProcess || appListInProcess || resendInProcess ? (
          <Spinner />
        ) : pushNotifications ? (
          <Table responsive>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>Id</th>
                <th>app Id</th>
                <th>app Name</th>
                <th>app platform</th>
                <th>title</th>
                <th>priority</th>
                <th>ttl</th>
                <th>image</th>
                <th>Action</th>
                <th>body</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {pushNotifications.map((notification, index) => (
                <tr key={index}>
                  <td>{notification?._id.slice(-4)}</td>
                  <td>{notification?.app?._id}</td>
                  <td>{notification?.app?.name}</td>
                  <td>{notification?.app?.platform}</td>
                  <td>{notification?.title}</td>
                  <td>{notification?.priority}</td>
                  <td>{notification?.ttl}</td>
                  <td>
                    <a href={notification?.imageUrl} target='_blank'>
                      <Image style={{ cursor: 'pointer' }} className='mr-50 text-info' size={15} />
                    </a>
                  </td>
                  <td>
                    <Send
                      onClick={() => resendNotification(notification?._id)}
                      style={{ cursor: 'pointer', marginRight: '15px' }}
                      className={classNames({ 'text-success': true })}
                      size={15}
                    />
                    <Link to={isDeleted ? '/list-notifications' : '/list-notifications'}>
                      <Trash2
                        onClick={() => deleteEventHandler(notification?._id)}
                        style={{ cursor: 'pointer' }}
                        className={classNames({ 'text-danger': true })}
                        size={15}
                      />
                    </Link>
                  </td>
                  <td>{notification?.body}</td>
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

export default listNotifications
