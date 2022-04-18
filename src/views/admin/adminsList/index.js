/* eslint-disable multiline-ternary */
import React, { Fragment, useState, useEffect, memo } from 'react'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classNames from 'classnames'
import Spinner from '../../common/Spinner'
import ReactPaginate from 'react-paginate'

import { Edit, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'
import { handleDeleteAdmin } from '../../../redux/actions/admin/deleteAdmin'
import {
  handleAdminsFetch,
  handlePageChange,
  handleSelectChange,
  restAdminsList
} from '../../../redux/actions/admin/fetchAdminsList'

function index() {
  const dispatch = useDispatch()
  const [searchKeyword, setSearchKeyword] = useState('')
  const { loading, deleteInProcess, page, limit, adminsListData, totalRecords, totalPages, isDeleted, error } = useSelector(
    state => state.adminsList
  )
  const { admin } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(handleAdminsFetch(page, limit, searchKeyword))
  }, [searchKeyword])

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
  }

  const handlePagination = page => {
    dispatch(handlePageChange(page, limit, searchKeyword))
  }

  const handleLimitChange = e => {
    dispatch(handleSelectChange(e.target.value, limit, searchKeyword))
  }

  const deleteAdminHandler = adminId => {
    if (confirm(`Are you sure you want to delete the admin with ID:  ${adminId}`)) {
      dispatch(handleDeleteAdmin(adminId, page, limit, searchKeyword))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(restAdminsList())
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
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Admins</CardTitle>
        </CardHeader>

        <Row className='mx-0 mt-1 mb-75 justify-content-between'>
          <Col>
            <div className='d-flex align-items-center'>
              <Label className='mr-1' style={{ marginRight: '15px' }} for='limit'>
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
              <Label for='limit' style={{ marginLeft: '15px' }}>
                Records
              </Label>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='4'>
            <Label className='mr-1' style={{ marginRight: '15px' }} for='searchKeyword'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='searchKeyword'
              name='searchKeyword'
              onChange={onChangeHandler}
            />
          </Col>
        </Row>

        {/* loading false */}
        {loading || deleteInProcess ? (
          <Spinner />
        ) : adminsListData?.admins ? (
          <Table responsive className='dataTable'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminsListData.admins.map((adminInfo, index) => (
                <tr key={index}>
                  <td>{adminInfo._id.slice(-4)}</td>
                  <td>{adminInfo.name}</td>
                  <td>{adminInfo.email}</td>
                  <td>{adminInfo.role === 'spradmin' ? 'Super Admin' : 'Admin'}</td>

                  {admin.role === 'spradmin' && adminInfo.role !== 'spradmin' ? (
                    <td>
                      <Link to={`/admins/update/${adminInfo._id}`} style={{ marginRight: '8px' }}>
                        <Edit
                          style={{ cursor: 'pointer' }}
                          className={classNames({ 'mr-50 text-success': true, 'link-disabled': adminInfo.role === 'spradmin' })}
                          size={15}
                        />
                      </Link>
                      <Link to={isDeleted ? '/admins' : '/admins'}>
                        <Trash
                          onClick={() => deleteAdminHandler(adminInfo._id)}
                          style={{ cursor: 'pointer' }}
                          className={classNames({ 'mr-50 text-danger': true, 'link-disabled': adminInfo.role === 'spradmin' })}
                          size={15}
                        />
                      </Link>
                    </td>
                  ) : (
                    <td></td>
                  )}
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

          {error && (
            <p className='text-danger'>
              {error?.errors.length
                ? `${error.errors[0].param} ${error.errors[0].msg}`
                : error?.statusCode === 401 || error?.statusCode === 403
                ? 'You are not Authorized to complete this action!'
                : ''}
            </p>
          )}
        </Row>
      </Card>
    </Fragment>
  )
}

export default memo(index)
