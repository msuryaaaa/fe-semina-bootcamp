import React, { useEffect, useState } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData, getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
let debounceFetchCategories = debounce(getData, 1000);

export default function CategoriesPage() {
	const [status, setStatus] = useState('idle');
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [alert, setAlert] = useState({
		status: false,
		message: '',
	});

	const getAPICategories = async () => {
		setStatus('progress');
		setTimeout(() => {
			setAlert({
				status: false,
				message: '',
			});
		}, 5000);
		const res = await debounceFetchCategories('/v1/cms/categories');
		if (res.status === 200) {
			setData(res.data.data);
			setStatus('success');
		}
	};

	useEffect(() => {
		getAPICategories();
	}, []);

	const handleDelete = async (id) => {
		Swal.fire({
			title: 'Apa kamu yakin?',
			text: 'Anda tidak akan dapat mengembalikan ini!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Iya, Hapus',
			cancelButtonText: 'Batal',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await deleteData(`/v1/cms/categories/${id}`);

				if (res.status === 200) {
					getAPICategories();
					setAlert({
						status: true,
						message: `berhasil hapus kategori ${res.data.data.name}`,
					});
				}
			}
		});
	};

	return (
		<Container>
			<SBreadCrumb textSecound='Categories' />
			{alert.status && <SAlert variant='success' message={alert.message} />}
			<SButton action={() => navigate('/categories/create')}>Tambah</SButton>
			<Table striped bordered hover className='my-3'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{status === 'progress' ? (
						<tr>
							<td colSpan={4} style={{ textAlign: 'center' }}>
								<div className='flex items-center justify-center'>
									<Spinner animation='border' variant='primary' />
								</div>
							</td>
						</tr>
					) : data.length > 0 ? (
						data.map((data, index) => (
							<tr key={index}>
								<td>{data.name}</td>
								<td>
									<SButton
										variant='success'
										size='sm'
										action={() => navigate(`/categories/edit/${data._id}`)}
									>
										Edit
									</SButton>
									<SButton
										variant='danger'
										size='sm'
										className='mx-2'
										action={() => handleDelete(data._id)}
									>
										Hapus
									</SButton>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={2} style={{ textAlign: 'center' }}>
								Tidak Ditemukan Data
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</Container>
	);
}
