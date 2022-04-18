import React, { Fragment, useState, useEffect } from 'react'
import classNames from 'classnames'
import Spinner from '../common/Spinner'
import ReactPaginate from 'react-paginate'

import { formatDate } from '@utils'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Edit, Image, RefreshCw, Trash } from 'react-feather'
import { handleGetAppList } from '../../redux/actions/App/GetAppListAction'
import { Card, CardHeader, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'
import { handleDeletePromotion } from '../../redux/actions/promotion/DeletePromotionAction'
import {
  handlePageChangePromotion,
  handleSelectChangePromotion,
  resetPromotionList,
  handleGetPromotionList
} from '../../redux/actions/promotion/GetPromotionsListAction'

function ListPromotion() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [adFormat, setAdFormat] = useState('')
  const [appId, setAppId] = useState('')
  const [screenId, setScreenId] = useState('')
  const dispatch = useDispatch()

  const {
    promotionListInProcess,
    promotionListData,
    totalRecords,
    totalPages,
    deleteInProcess,
    isDeleted,
    limit,
    page
  } = useSelector(state => state.promotionList)

  const { appListInProcess, appListData } = useSelector(state => state.appList)

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword' || name === 'label') setSearchKeyword(value)
    else if (name === 'adFormat') setAdFormat(value)
    else if (name === 'appId') setAppId(value)
    else if (name === 'screenId') setScreenId(value)
  }

  useEffect(() => {
    dispatch(handleGetPromotionList(page, limit, appId, adFormat, screenId, searchKeyword))
  }, [searchKeyword, isDeleted, adFormat, appId, screenId])

  useEffect(() => {
    dispatch(handleGetAppList(page, limit))
  }, [])

  const handlePagination = page => {
    dispatch(handlePageChangePromotion(page, limit, searchKeyword))
  }

  const handleLimitChange = e => {
    dispatch(handleSelectChangePromotion(e.target.value, limit, searchKeyword))
  }

  const deleteEventHandler = app_Id => {
    if (confirm(`Are you sure you want to delete the promotion with ID: ${app_Id} ?`)) {
      dispatch(handleDeletePromotion(app_Id, page, limit, searchKeyword))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetPromotionList())
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

  const resetFilters = () => {
    setSearchKeyword('')
    setAdFormat('')
    setAppId('')
    setScreenId('')
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Promotions List</CardTitle>
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

          <Col sm={12} md={6} lg={4} className='d-flex align-items-center justify-content-sm-start mb-1 mt-sm-0 mt-1'>
            <Label className='mr-1' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} for='screenId'>
              Screen Id
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              placeholder='Search...'
              id='screenId'
              name='screenId'
              onChange={onChangeHandler}
            />
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

          <Col sm={12} md={6} lg={3} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='adFormat' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} className='mr-1'>
                Ad Format
              </Label>

              <Input
                style={{ width: '180px' }}
                className='dataTable-select mr-1'
                type='select'
                id='adFormat'
                name='adFormat'
                value={adFormat}
                onChange={onChangeHandler}
              >
                <option value=''>Choose...</option>
                <option value='banner'>Banner</option>
                <option value='interstitial'>Interstitial</option>
                <option value='native'>Native</option>
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

        {/* loading */}
        {promotionListInProcess || deleteInProcess ? (
          <Spinner />
        ) : promotionListData?.promotions ? (
          <Table responsive>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>Id</th>
                <th colSpan={2}>App</th>
                <th>label</th>
                <th>ad Format</th>
                <th>screen Ids</th>
                <th>Action</th>
                <th>frequency</th>
                <th colSpan={2}>delay</th>
                <th>title</th>
                <th>body</th>
                <th>url</th>
                <th>imageUrl</th>
                <th>expiryTime</th>
              </tr>
            </thead>

            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th></th>
                <th>Name</th>
                <th>Platform</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>value</th>
                <th>interval</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody style={{ textAlign: 'center' }}>
              {promotionListData?.promotions.map((promotion, index) => (
                <tr key={index}>
                  <td>{promotion?._id.slice(-4)}</td>
                  <td>{promotion?.app?.name}</td>
                  <td>{promotion?.app?.platform}</td>
                  <td>{promotion?.label}</td>
                  <td>{promotion?.adFormat}</td>
                  <td>{promotion?.screenIds.join(', ')}</td>
                  <td>
                    <Link to={`/update-promotion/${promotion?._id}`} style={{ marginRight: '10px' }}>
                      <Edit style={{ cursor: 'pointer' }} className='mr-50 text-success' size={15} />
                    </Link>
                    <Link to={isDeleted ? '/list-promotions' : '/list-promotions'}>
                      <Trash
                        onClick={() => deleteEventHandler(promotion?._id)}
                        style={{ cursor: 'pointer' }}
                        className={classNames({ 'text-danger': true })}
                        size={15}
                      />
                    </Link>
                  </td>
                  <td>{promotion?.frequency}</td>
                  <td>{promotion?.delay?.value}</td>
                  <td>{promotion?.delay?.interval}</td>
                  <td>{promotion?.title}</td>
                  <td>{promotion?.body}</td>
                  <td>
                    <a className='text-black-50' href={`${promotion?.url}`} target='_blank'>
                      {promotion?.label}
                    </a>
                  </td>
                  <td>
                    <a target='__blank' href={`${promotion?.imageUrl}`}>
                      <Image style={{ cursor: 'pointer' }} className='mr-50 text-info' size={15} />
                    </a>
                  </td>
                  <td>{formatDate(promotion?.expiryTime)}</td>
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

export default ListPromotion
